
const ProductComponent = ({ product, handleGoToCart, handleAdd, isInCart }) => {
  return (
    <div className="card" key={product.id}>
      <img src={product.image} className="img-fluid" alt={product.title} />
      <h6 className="pt-3">{product.title}</h6>
      <h6>${product.price}</h6  >
      <button
        className={`btn btn-primary btn-sm px-2 ${isInCart ? "btn-go-to-cart btn-warning" : "btn-add-to-cart"}`}
        onClick={() => (isInCart ? handleGoToCart() : handleAdd(product))}
      >
        {isInCart ? "Go to Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductComponent;
