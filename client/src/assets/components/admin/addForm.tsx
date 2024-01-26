import { SyntheticEvent } from "react";
import { useMutation } from "react-query";
import { ADD_PRODUCT, Product } from "../../../graphql/products";
import { graphqlFetcher } from "../../../queryClient";
import arrToObj from "../../../util/arrToObj";

type OmittedProduct = Omit<Product, "id" | "createdAt">;

const AddForm = () => {
  const { mutate: addProduct } = useMutation(
    ({ title, imageUrl, price, description }: OmittedProduct) =>
      graphqlFetcher(ADD_PRODUCT, { title, imageUrl, price, description })
  );

  // 제출 버튼
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault(); // 다른 페이지로 이동하는 것 방지
    const formData = arrToObj([...new FormData(e.target as HTMLFormElement)]);
    formData.price = Number(formData.price); // price만 number로 형변환
    addProduct(formData as OmittedProduct);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        상품명:
        <input name="title" type="text" required />
      </label>
      <label>
        이미지URL:
        <input name="imageUrl" type="text" required />
      </label>
      <label>
        상품가격:
        <input name="price" type="text" required />
      </label>
      <label>
        상세:
        <textarea name="description" />
      </label>

      <button type="submit">등록</button>
    </form>
  );
};

export default AddForm;
