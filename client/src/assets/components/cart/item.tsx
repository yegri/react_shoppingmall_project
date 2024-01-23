import { useMutation } from "react-query";
import { Cart, DELETE_CART, UPDATE_CART } from "../../../graphql/cart";
import { QueryKeys, getClient, graphqlFetcher } from "../../../queryClient";
import { forwardRef, ForwardedRef, SyntheticEvent } from "react";
import ItemData from "./itemData";

const CartItem = (
  { id, product: { imageUrl, price, title }, amount }: Cart,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const queryClient = getClient();

  // 장바구니 수량 업데이트
  const { mutate: updateCart } = useMutation<
    Cart,
    unknown,
    { id: string; amount: number }
  >(({ id, amount }) => graphqlFetcher(UPDATE_CART, { id, amount }), {
    onMutate: async ({ id, amount }) => {
      await queryClient.cancelQueries(QueryKeys.CART);

      // Snapshot the previous value
      const { cart: prevCart } = queryClient.getQueryData<{ cart: Cart[] }>(
        QueryKeys.CART
      ) || { cart: [] };
      if (!prevCart) return null;

      const targetIndex = prevCart?.findIndex((cartItem) => cartItem.id === id);
      if (targetIndex === undefined || targetIndex < 0) return prevCart;

      const newCart = [...prevCart];
      newCart.splice(targetIndex, 1, { ...newCart[targetIndex], amount });

      queryClient.setQueryData(QueryKeys.CART, { cart: newCart });
      return prevCart;
    },
    onSuccess: (updateCart) => {
      // 아이템 하나에 대한 데이터
      const { cart: prevCart } = queryClient.getQueryData<{ cart: Cart[] }>(
        QueryKeys.CART
      ) || { cart: [] };
      const targetIndex = prevCart?.findIndex(
        (cartItem) => cartItem.id === updateCart.id
      );

      if (!prevCart || targetIndex === undefined || targetIndex < 0) return;

      const newCart = [...prevCart];
      newCart.splice(targetIndex, 1, updateCart);
      queryClient.setQueryData(QueryKeys.CART, { cart: newCart });
    },
  });

  // 장바구니 삭제
  const { mutate: deleteCart } = useMutation(
    ({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.CART);
      },
    }
  );

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    if (amount < 1) return;
    updateCart({ id, amount });
  };

  const handleDeleteItem = () => {
    deleteCart({ id });
  };

  return (
    <li className="cart-item">
      <input
        className="cart-item__checkbox"
        type="checkbox"
        name={`select-item`}
        ref={ref}
        data-id={id}
      />
      <ItemData imageUrl={imageUrl} price={price} title={title} />

      <input
        type="number"
        className="cart-item__amount"
        value={amount}
        onChange={handleUpdateAmount}
        min={1}
      />

      <button
        className="cart-item__button"
        type="button"
        onClick={handleDeleteItem}
      >
        삭제
      </button>
    </li>
  );
};

export default forwardRef(CartItem);
