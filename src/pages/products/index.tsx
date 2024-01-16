import { useQuery } from "react-query";
import { QueryKeys, graphqlFetcher } from "../../queryClient";
import ProductItem from "../../assets/components/product/item";
import GET_PRODUCTS, { Products } from "../../graphql/products";

const ProductsList = () => {
  // 데이터 가져오기, type 정의
  const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () =>
    graphqlFetcher<Products>(GET_PRODUCTS)
  );

  return (
    <div>
      <h2>상품목록</h2>
      <ul className="products">
        {data?.products?.map((product: any) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
