import { Cart } from "../../../graphql/cart";
import { Product } from "../../../graphql/products";

const ItemData = ({
  imageUrl,
  price,
  title,
}: Pick<Product, "imageUrl" | "price" | "title">) => (
  <>
    <img className="cart-item__image" src={imageUrl} alt="" />
    <p className="cart-item__price">{price}</p>
    <p className="cart-item__title">{title}</p>
  </>
);

export default ItemData;
