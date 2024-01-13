import { useQuery } from "react-query";
import { QueryKeys, fetcher } from "../../queryClient";
import ProductItem from "../../assets/components/product/item";

const ProductsList = () => {
  // 데이터 가져오기, type 정의
  const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () =>
    fetcher({
      method: "GET",
      path: "/products",
    })
  );

  console.log(data);

  return (
    <div>
      <h2>상품목록</h2>
      <ul className="products">
        {data?.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
