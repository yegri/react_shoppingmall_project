import { DBField, writeDB } from "../dbController";
import { Products, Resolver } from "./types";
import { v4 as uuid } from "uuid";
import { db } from "../../firebase";
import {
  collection,
  orderBy,
  query,
  where,
  limit,
  getDocs,
  getDoc,
  doc,
  startAfter,
  DocumentData,
  serverTimestamp,
  addDoc,
  updateDoc,
} from "firebase/firestore";

const PAGE_SIZE = 15;
const setJSON = (data: Products) => writeDB(DBField.PRODUCTS, data);

const productResolver: Resolver = {
  Query: {
    products: async (parent, { cursor = "", showDeleted = false }) => {
      const products = collection(db, "products"); // 1️⃣ 번
      const queryOptions = []; // orderby Error with startAfter, where
      if (cursor) {
        const snapshot = await getDoc(doc(db, "products", cursor)); // 2️⃣ 번
        queryOptions.push(startAfter(snapshot)); // 3️⃣ 번
      }
      if (!showDeleted) queryOptions.unshift(where("createdAt", "!=", null)); // 4️⃣ 번
      const q = query(products, ...queryOptions, limit(PAGE_SIZE)); // 5️⃣ 번
      const snapshot = await getDocs(q);
      const data: DocumentData[] = [];
      console.log(snapshot);
      snapshot.forEach(
        (
          doc // 6️⃣ 번
        ) =>
          data.push({
            id: doc.id,
            ...doc.data(),
          })
      );
      return data;
    },

    product: async (parent, { id }) => {
      const snapshot = await getDoc(doc(db, "products", id));
      return {
        ...snapshot.data(),
        id: snapshot.id,
      };
    },
  },

  Mutation: {
    addProduct: async (parent, { imageUrl, price, title, description }) => {
      const newProduct = {
        imageUrl,
        price,
        title,
        description,
        createdAt: serverTimestamp(),
      };

      const result = await addDoc(collection(db, "products"), newProduct);
      const snapshot = await getDoc(result);
      return {
        ...snapshot.data(),
        id: snapshot.id,
      };
    },

    updateProduct: async (parent, { id, ...data }) => {
      const productRef = doc(db, "products", id);
      if (!productRef) throw new Error("상품이 없습니다.");
      await updateDoc(productRef, data);
      const snap = await getDoc(productRef);
      return {
        ...snap.data(),
        id: snap.id,
      };
    },

    deleteProduct: async (parent, { id }) => {
      // 실제 db에서 delete를 하는 대신, createdAt을 지워준다.
      const productRef = doc(db, "products", id);
      if (!productRef) throw new Error("상품이 없습니다.");
      await updateDoc(productRef, { createdAt: null });
      return id;
    },
  },
};

export default productResolver;
