import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  inceaseQuantity,
  removeItem,
} from "../redux/cartSlice";
import CartComponent from "../components/CartComponent";

const Cart = () => {
  const totalCartItems = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const products = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (productID) => {
    dispatch(removeItem(productID));
  };

  const increaseItemsQuantity = (itemid) => {
    dispatch(inceaseQuantity(itemid));
    console.log(itemid, "itemid");
  };

  const decreaseItemsQuantity = (itemid) => {
    dispatch(decreaseQuantity(itemid));
    console.log(itemid, "itemid");
  };

  return (
    <div className="cartWrapper">
      <div className="cart-container">
        {products?.map((product) => {
          return (
            <CartComponent
              increaseItemsQuantity={increaseItemsQuantity}
              key={product}
              decreaseItemsQuantity={decreaseItemsQuantity}
              handleRemove={handleRemove}
              product={product}
            />
          );
        })}
      </div>
      <div className="totalCartItems px-2">
        <p>Total cart items {totalCartItems === 0 ? "0" : totalCartItems}</p>
        <h6>Final price {Math.floor(totalPrice)}</h6>
      </div>
    </div>
  );
};

export default Cart;
