import { Resolver } from "./types";

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

const productResolver: Resolver = {
  Query: {
    products: (parent, args, context, info) => {
      return mock_products;
    },
    product: (parent, { id }, context, info) => {
      const found = mock_products.find((item) => item.id === id);

      if (found) return found;

      return null;
    },
  },
};

export default productResolver;
