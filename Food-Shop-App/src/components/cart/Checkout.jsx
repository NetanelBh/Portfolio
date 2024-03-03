import styles from "./Checkout.module.css";

import { useContext } from "react";

import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Error from "../UI/Error";
import useHttp from "../../hooks/useHttp";
import PacmanLoading from "../UI/PacmanLoading";
import CartContext from "../../store/CartContext";
import TotalCartCost from "../util/TotalCartCost";
import UserProgressContext from "../../store/UserProgressContext";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    isLoading: isSending,
    error,
    data,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const handleClose = () => {
    userProgressCtx.hideCheckout();
  };

  const handleFinish = () => {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Built-in fuctions to get the data from the event as an object
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    requestConfig.body = JSON.stringify({
      order: {
        items: cartCtx.items,
        customer: customerData,
      },
    });

    sendRequest();
  };

  let classes = (
    <p className={`${styles["modal-actions"]}`}>
      <button
        type="button"
        className={`${styles["text-button"]}`}
        onClick={userProgressCtx.hideCheckout}
      >
        Close
      </button>
      <button className={styles.button}>Submit order</button>
    </p>
  );

  if (isSending) {
    classes = <PacmanLoading color="#ffab04" />;
  }

  if (error) {
    classes = <Error title={"Failed send data"} message={error} />;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClose}
      >
        <h2>success!</h2>
        <p>Your order submitted successfully</p>
        <p className={`${styles["modal-actions"]}`}>
          <button className={`${styles["text-button"]}`} onClick={handleFinish}>
            OK
          </button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      className={styles.control}
      open={userProgressCtx.progress === "checkout"}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {TotalCartCost(cartCtx.items)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className={`${styles["control-row"]}`}>
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {classes}
      </form>
    </Modal>
  );
};

export default Checkout;
