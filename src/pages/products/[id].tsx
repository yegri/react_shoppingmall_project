import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import ProductDetail from "../../assets/components/product/detail";
import { GET_PRODUCT, Product } from "../../graphql/products";

const ProductsDetail = () => {
  const { id } = useParams();

  // 데이터 가져오기, type 정의
  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    graphqlFetcher<Product>(GET_PRODUCT, { id })
  );

  if (!data) return null;

  return (
    <div>
      <h2>상품상세</h2>
      <ProductDetail item={data} />
    </div>
  );
};

export default ProductsDetail;
