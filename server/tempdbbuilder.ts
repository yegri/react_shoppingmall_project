import { v4 as uuid } from "uuid";
import { DBField, writeDB } from "./src/dbController";

const db = Array.from({ length: 100 }).map((_, i) => ({
  id: uuid(),
  imageUrl: `https://source.unsplash.com/200x150/?nature/${i}`,
  price: 1000 + Math.floor(Math.random() * 20) * 500,
  title: `임시상품${i}`,
  description: `임시상세내용${i}`,
  createdAt: 1642424841540 + 1000 * 60 * 60 * 5 * i,
}));

writeDB(DBField.PRODUCTS, db);
