import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { QueryKeys, fetcher } from "../../queryClient";
import ProductDetail from "../../assets/components/product/detail";

const ProductsDetail = () => {
  const { id } = useParams();

  // 데이터 가져오기, type 정의
  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    fetcher({
      method: "GET",
      path: `/products/${id}`,
    })
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
