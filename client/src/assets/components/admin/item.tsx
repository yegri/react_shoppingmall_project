import { Link } from "react-router-dom";
import { Product } from "../../../graphql/products";
import { useMutation } from "react-query";
import { graphqlFetcher } from "../../../queryClient";
import { ADD_CART, Cart } from "../../../graphql/cart";

const AdminItem = ({ imageUrl, price, title, id }: Product) => {
  const { mutate: addCart } = useMutation((id: string) =>
    graphqlFetcher(ADD_CART, { id })
  );

  return (
    <li className="products-item">
      <Link to={`/products/${id}`}>
        <p className="products-item__title">{title}</p>
        <img className="products-item__image" src={imageUrl} />
        <span className="products-item__price">${price}</span>
      </Link>
      <button className="product-item__add-cart" onClick={() => addCart(id)}>
        어드민!!!
      </button>
    </li>
  );
};

export default AdminItem;
