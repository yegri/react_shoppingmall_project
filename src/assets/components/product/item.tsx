import { Link } from "react-router-dom";
import { Product } from "../../../graphql/products";

const ProductItem = ({
  imageUrl,
  price,
  title,
  description,
  createdAt,
  id,
}: Product) => {
  return (
    <li className="products-item">
      <Link to={`/products/${id}`}>
        <p className="products-item__title">{title}</p>
        <img className="products-item__image" src={imageUrl} />
        <span className="products-item__price">${price}</span>
      </Link>
    </li>
  );
};

export default ProductItem;
