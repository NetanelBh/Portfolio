import styles from "./CartItem.module.css";

import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../store/cartSlice";

import Card from "../UI/Card";
import Button from "../UI/Button";
import availableInStock from "../utils/isAvailableInStock";
import AlertDialog from "../dialog/Dialog";
import { useState } from "react";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const [isInStock, setIsInStock] = useState(true);
  const cartProducts = useSelector((state) => state.cart.products);
  const dbProducts = useSelector((state) => state.products.products);

  const totalPrice = product.qty * +product.price;

  const incrementHandler = () => {
    // Check if the item is still available in stock
    const isAvailable = availableInStock(product.id, cartProducts, dbProducts);
    if (isAvailable) {
      dispatch(
        usersActions.increase({
          id: product.id,
          price: product.price,
          name: product.name,
        })
      );
    } else {
      setIsInStock(false);
    }
  };

  const decrementHandler = () => {
    dispatch(
      usersActions.decrease({
        id: product.id,
        price: product.price,
        name: product.title,
      })
    );
  };

  const removeItemHandler = () => {
    dispatch(usersActions.removeProduct(product.id));
  };

  const cancelDialogClick = () => {
    setIsInStock(true);
  };

  return (
    <Card className={styles.container}>
      <span className={styles.title}>{product.name}</span>

      <Button
        className={styles.action_btn}
        title="-"
        type="button"
        onClick={decrementHandler}
      />

      <span className={styles.qty_badge}>{product.qty}</span>

      <Button
        className={styles.action_btn}
        title="+"
        type="button"
        onClick={incrementHandler}
      />

      <span className={styles.price_section}>
        {" "}
        - Total: {String.fromCharCode(0x20aa)}
        {totalPrice}
      </span>

      <Button
        title="X"
        type="button"
        className={styles.cancel_btn}
        onClick={removeItemHandler}
      />

      <AlertDialog
        title="Out of stock"
        message="There are no enough items in stock"
        buttonTitle="OK"
        openModal={!isInStock}
        onCancel={cancelDialogClick}
      />
    </Card>
  );
};

export default CartItem;
