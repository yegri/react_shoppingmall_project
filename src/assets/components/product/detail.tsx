const ProductDetail = ({
  item: {
    category,
    image,
    price,
    description,
    title,
    rating: { rate },
  },
}: {
  item: Product;
}) => {
  return (
    <div className="products-detail">
      <p className="products-item__category">{category}</p>
      <p className="products-item__title">{title}</p>
      <img className="products-item__image" src={image} />
      <p className="products-item__description">${description}</p>
      <span className="products-item__price">${price}</span>
      <span className="products-item__rate">{rate}</span>
    </div>
  );
};

export default ProductDetail;
