import { gql } from "graphql-tag";
import { Product } from "./products";

export type Cart = {
  id: string;
  amount: number;
  product: Product;
};

// 장바구니 데이터 가져오기
const GET_CART = gql`
  query GET_CART {
    cart {
      id
      amount
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
    }
  }
`;

// 장바구니에 추가
export const ADD_CART = gql`
  mutation ADD_CART($id: ID!) {
    addCart(productId: $id) {
      id
      amount
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
    }
  }
`;

// 장바구니 삭제
export const DELETE_CART = gql`
  mutation DELETE_CART($id: ID!) {
    deleteCart(cartId: $id)
  }
`;

// 장바구니 업데이트
export const UPDATE_CART = gql`
  mutation UPDATE_CART($id: ID!, $amount: Int!) {
    updateCart(cartId: $id, amount: $amount) {
      id
      amount
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
    }
  }
`;

export default GET_CART;
