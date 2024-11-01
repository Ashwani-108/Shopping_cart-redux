import { Link } from "react-router-dom";


const ProductComponent = ({ product, handleGoToCart, handleAdd, isInCart }) => {

  const handleSingleCategory = (id) =>{
    console.log(id, "categoryName");
    window.open(`/products/${id}`, "_blank");
  }

  return (
    <div className="card" key={product.id}>
      <img src={product.image} className="img-fluid" alt={product.title} />
      <Link className="pt-3" onClick={() => handleSingleCategory(product.id)} >{product.title}</Link>
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
