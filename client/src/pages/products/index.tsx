import { useQuery } from "react-query";
import { QueryKeys, graphqlFetcher } from "../../queryClient";

import GET_PRODUCTS, { Products } from "../../graphql/products";
import ProductList from "../../assets/components/product/list";

const ProductsListPage = () => {
  // 데이터 가져오기, type 정의
  const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () =>
    graphqlFetcher<Products>(GET_PRODUCTS)
  );

  return (
    <div>
      <h2>상품목록</h2>

      <ProductList list={data?.products || []} />
    </div>
  );
};

export default ProductsListPage;
