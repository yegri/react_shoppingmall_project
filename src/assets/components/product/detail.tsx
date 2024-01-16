import { Product } from "../../../graphql/products";

const ProductDetail = ({
  item: { imageUrl, price, description, title },
}: {
  item: Product;
}) => {
  return (
    <div className="products-detail">
      <p className="products-item__title">{title}</p>
      <img className="products-item__image" src={imageUrl} />
      <p className="products-item__description">${description}</p>
      <span className="products-item__price">${price}</span>
    </div>
  );
};

export default ProductDetail;
