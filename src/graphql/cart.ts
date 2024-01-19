import { gql } from "graphql-tag";

export type Cart = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  amount: number;
};

// 장바구니에 추가
export const ADD_CART = gql`
  mutation ADD_CART($id: string) {
    cart(id: $id) {
      id
      imageUrl
      price
      title
      amount
    }
  }
`;

// 장바구니 삭제
export const DELETE_CART = gql`
  mutation DELETE_CART($id: string) {
    id
  }
`;

// 장바구니 업데이트
export const UPDATE_CART = gql`
  mutation UPDATE_CART($id: string, $amount: number) {
    cart(id: $id, amount: $amount) {
      id
      imageUrl
      price
      title
      amount
    }
  }
`;

// 장바구니 데이터 가져오기
const GET_CART = gql`
  query GET_CART {
    cart {
      id
      imageUrl
      price
      title
    }
  }
`;

export default GET_CART;
