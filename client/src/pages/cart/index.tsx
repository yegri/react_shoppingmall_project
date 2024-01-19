import { useQuery } from "react-query";
import { QueryKeys, graphqlFetcher } from "../../queryClient";
import GET_CART, { Cart } from "../../graphql/cart";
import CartList from "../../assets/components/cart/list";

const CartIndex = () => {
  const { data } = useQuery(QueryKeys.CART, () => graphqlFetcher(GET_CART), {
    staleTime: 0,
    cacheTime: 1000,
  });

  const cartItems = Object.values(data || {}) as Cart[];

  if (!data) return <div>장바구니가 비었어요</div>;

  return <CartList items={cartItems} />;
};

export default CartIndex;
