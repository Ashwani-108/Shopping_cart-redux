import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, inceaseQuantity, removeItem } from "../redux/cartSlice";

const Cart = () => {

  const totalCartItems = useSelector(state => state.cart.totalQuantity)
  const totalPrice = useSelector(state => state.cart.totalPrice)
  const products = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (productID) => {
    dispatch(removeItem(productID));
  };

  const increaseItemsQuantity = (itemid) => {
    dispatch(inceaseQuantity(itemid));
    console.log(itemid, "itemid");
  };

  const decreaseItemsQuantity = (itemid) =>{
    dispatch(decreaseQuantity(itemid));
    console.log(itemid, "itemid");
  }

  return (
    <div className="cartWrapper">
      <div className="cart-container">
        {products?.map((product) => {
          return (
            <div className="cartCard" key={product.id}>
              <img src={product.image} alt="" />
              <h5>{product.title}</h5>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "5px"}}>
                <button className="btn btn-sm" onClick={() => increaseItemsQuantity(product)}>+</button>
                <h6>{product.quantity}</h6>
                <button className="btn btn-sm" onClick={() => decreaseItemsQuantity(product)}>-</button>
              </div>
              <h5>${product.price*product.quantity}</h5>
              <button className="btn" onClick={() => handleRemove(product)}>
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <div className="totalCartItems">
      {totalCartItems === 0 ? 'cart is empty':totalCartItems}
      <h4>
        {totalPrice}
      </h4>
      </div>
    </div>
  );
};

export default Cart;
