
const CartComponent = ({increaseItemsQuantity,decreaseItemsQuantity,handleRemove,product}) => {
  return (
    <>
        <div className="cartCard" key={product.id}>
            <img src={product.image} className="img-fluid" alt="cart-product-img" />
            <h6>{product.title}</h6>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "5px"}}>
                <button className="btn btn-sm btn-primary" onClick={() => increaseItemsQuantity(product)}>+</button>
                <h6>{product. quantity}</h6>
                <button className="btn btn-sm btn-primary" onClick={() => decreaseItemsQuantity(product)}>-</button>
            </div>
            <h6>${product.price * product.quantity}</h6>
            <button className="btn btn-danger btn-sm" onClick={() => handleRemove(product)}>
                Remove
            </button>
        </div>
    </>
  )
}

export default CartComponent