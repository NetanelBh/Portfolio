import { useContext } from "react";

import styles from "./Cart.module.css";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import ShekelSymbol from "../util/ShekelSymbol";
import CartContext from "../../store/CartContext";
import TotalCartCost from "../util/TotalCartCost";
import UserProgressContext from "../../store/UserProgressContext";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotalPrice = TotalCartCost(cartCtx.items);

  // Arbitrary numbet to get the currency symbol
  const currencySymbol = ShekelSymbol();

  const closeCartHandler = () => {
    userProgressCtx.hideCart();
  };

  const showCheckoutHandler = () => {
    userProgressCtx.showCheckout();
  };

  return (
    <Modal
      open={userProgressCtx.progress === "cart"}
      //Only if is 'cart' and we pressed escape, we want to close the cart
      // but no in case that the modal closed because we are in 'checkout' mode
      onClose={userProgressCtx.progress === "cart" ? closeCartHandler : null}
    >
      <h2>Your cart</h2>
      <ul>
        {cartCtx.items.map(item => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncreaseItem={() => cartCtx.addItem(item)}
            onDecreaseItem={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className={`${styles["cart-total"]}`}>
        {currencySymbol}
        {cartTotalPrice}
      </p>
      <p className={`${styles["modal-actions"]}`}>
        <button
          className={`${styles["text-button"]}`}
          onClick={closeCartHandler}
        >
          Close
        </button>
        {cartCtx.items.length > 0 && (
          <button
            className={styles.button}
            onClick={showCheckoutHandler}
          >
            Go to Checkout
          </button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
