import { gql } from "graphql-request";

export type Cart = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  amount: number;
};

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