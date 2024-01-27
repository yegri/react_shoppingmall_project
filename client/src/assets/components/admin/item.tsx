import { Link } from "react-router-dom";
import {
  DELETE_PRODUCT,
  MutableProduct,
  Product,
  UPDATE_PRODUCT,
} from "../../../graphql/products";
import { useMutation } from "react-query";
import { QueryKeys, getClient, graphqlFetcher } from "../../../queryClient";
import { SyntheticEvent } from "react";
import arrToObj from "../../../util/arrToObj";

const AdminItem = ({
  imageUrl,
  price,
  title,
  id,
  description,
  createdAt,
  isEditing,
  startEdit,
  doneEdit,
}: Product & {
  isEditing: boolean;
  startEdit: () => void;
  doneEdit: () => void;
}) => {
  const queryClient = getClient();

  // 상품 수정하기
  const { mutate: updateProduct } = useMutation(
    ({ title, imageUrl, price, description }: MutableProduct) =>
      graphqlFetcher(UPDATE_PRODUCT, {
        id,
        title,
        imageUrl,
        price,
        description,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
          exact: false,
          refetchInactive: true,
        });

        doneEdit();
      },
    }
  );

  // 상품 삭제하기
  const { mutate: deleteProduct } = useMutation(
    ({ id }: { id: String }) =>
      graphqlFetcher(DELETE_PRODUCT, {
        id,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
          exact: false,
          refetchInactive: true,
        });
      },
    }
  );

  // 제출 버튼
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault(); // 다른 페이지로 이동하는 것 방지
    const formData = arrToObj([...new FormData(e.target as HTMLFormElement)]);
    formData.price = Number(formData.price); // price만 number로 형변환
    updateProduct(formData as MutableProduct);
  };

  // 아이템 삭제
  const deleteItem = () => {
    deleteProduct({ id });
  };

  if (isEditing)
    return (
      <li className="product-item">
        <form onSubmit={handleSubmit}>
          <label>
            상품명:
            <input name="title" type="text" required defaultValue={title} />
          </label>
          <label>
            이미지URL:
            <input
              name="imageUrl"
              type="text"
              required
              defaultValue={imageUrl}
            />
          </label>
          <label>
            상품가격:
            <input name="price" type="text" required defaultValue={price} />
          </label>
          <label>
            상세:
            <textarea name="description" defaultValue={description} />
          </label>

          <button type="submit">저장</button>
        </form>
      </li>
    );
  return (
    <li className="products-item">
      <Link to={`/products/${id}`}>
        <p className="products-item__title">{title}</p>
        <img className="products-item__image" src={imageUrl} />
        <span className="products-item__price">${price}</span>
      </Link>

      {!createdAt && <span>삭제된 상품</span>}

      <button className="product-item__update-item" onClick={startEdit}>
        수정
      </button>

      <button className="product-item__delete-item" onClick={deleteItem}>
        삭제
      </button>
    </li>
  );
};

export default AdminItem;
