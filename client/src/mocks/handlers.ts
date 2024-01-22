import { graphql } from "msw";
import { v4 as uuid } from "uuid";
import GET_PRODUCTS, { GET_PRODUCT } from "../graphql/products";
import GET_CART, {
  ADD_CART,
  Cart,
  DELETE_CART,
  UPDATE_CART,
} from "../graphql/cart";
import { EXECUTE_PAY } from "../graphql/payment";

// 상품 mock data
const mock_products = (() =>
  Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1 + "",
    imageUrl: `https://source.unsplash.com/200x150/?nature/${i + 1}`,
    price: 50000,
    title: `임시상품${i + 1}`,
    description: `임시상세내용${i + 1}`,
    createdAt: new Date(1645735501883 + i * 1000 * 60 * 60 * 10).toString(),
  })))();

// 장바구니 mock data
let cartData: { [key: string]: Cart } = {};

export const handlers = [
  // 전체 데이터
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.data({
        products: mock_products,
      })
    );
  }),

  // 개별 데이터
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const found = mock_products.find(
      (item) => item.id === req.body?.variables.id
    );

    if (found) return res(ctx.data(found));

    return res();
  }),

  // 장바구니에 담긴 데이터
  graphql.query(GET_CART, (req, res, ctx) => {
    return res(ctx.data(cartData));
  }),

  // 장바구니에 넣는 데이터
  graphql.mutation(ADD_CART, (req, res, ctx) => {
    const newCarData = { ...cartData };
    const id = req.variables.id;
    const targetProduct = mock_products.find(
      (item) => item.id === req.variables.id
    );
    if (!targetProduct) {
      throw new Error("상품이 없습니다");
    }
    const newItem = {
      ...targetProduct,
      amount: (newCarData[id]?.amount || 0) + 1,
    };
    newCarData[id] = newItem;
    cartData = newCarData;
    return res(ctx.data(newItem));
  }),

  // 장바구니 업데이트
  graphql.mutation(UPDATE_CART, (req, res, ctx) => {
    const newData = { ...cartData };
    const { id, amount } = req.variables;

    if (!newData[id]) {
      throw new Error("없는 데이터입니다");
    }

    const newItem = {
      ...newData[id],
      amount,
    };

    newData[id] = newItem;
    cartData = newData;

    return res(ctx.data(newItem));
  }),

  // 장바구니 지우기
  graphql.mutation(DELETE_CART, ({ variables: { id } }, res, ctx) => {
    const newData = { ...cartData };
    delete newData[id];
    cartData = newData;
    return res(ctx.data(id));
  }),

  // 결제 실행
  graphql.mutation(EXECUTE_PAY, ({ variables: ids }, res, ctx) => {
    ids.forEach((id: string) => {
      delete cartData[id];
    });
    return res(ctx.data(ids));
  }),
];
