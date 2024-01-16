import { graphql } from "msw";
import { v4 as uuid } from "uuid";
import GET_PRODUCTS, { GET_PRODUCT } from "../graphql/products";
import GET_CART, { ADD_CART, Cart } from "../graphql/cart";

// 상품 mock data
const mock_products = (() =>
  Array.from({ length: 20 }).map((_, i) => ({
    id: uuid(),
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
];
