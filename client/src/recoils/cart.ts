import { atom } from "recoil";
import { Cart } from "../graphql/cart";

const checkedCartState = atom<Cart[]>({
  key: "cartState",
  default: [],
});

export default checkedCartState;

// export const cartItemSelector = selectorFamily<number | undefined, string>({
//   key: "cartItem",
//   get:
//     (id: string) =>
//     ({ get }) => {
//       const carts = get(cartState);
//       return carts.get(id);
//     },
//   set:
//     (id: string) =>
//     ({ get, set }, newValue) => {
//       if (typeof newValue === "number") {
//         const newCart = new Map([...get(cartState)]);
//         newCart.set(id, newValue);
//         set(cartState, newCart);
//       }
//     },
// });
