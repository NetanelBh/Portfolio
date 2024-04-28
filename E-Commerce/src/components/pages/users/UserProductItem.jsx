import styles from "./UserProductItem.module.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../UI/Card";
import Button from "../../UI/Button";
import AlertDialog from "../../dialog/Dialog";
import { usersActions } from "../../store/cartSlice";
import availableInStock from "../../utils/isAvailableInStock";
import numOfUsersBoughtProduct from "../../hooks/usersBoughtProduct";

const UserProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const [isInStock, setIsInStock] = useState(true);
  const cartProducts = useSelector((state) => state.cart.products);
  const dbProducts = useSelector((state) => state.products.products);

  // Find num of users bought this product(only who allowed see his orders)
  const numOfUsers = numOfUsersBoughtProduct(product.id);

  const decrementQtyHandler = () => {
    if (qty === 0) return;

    // Update Redux cart qty
    dispatch(
      usersActions.decrease({
        id: product.id,
        price: product.price,
        name: product.title,
      })
    );
  };

  const incrementQtyHandler = () => {
    // Check if the item is still available in stock
    const isAvailable = availableInStock(product.id, cartProducts, dbProducts);
    if (isAvailable) {
      // Update Redux cart qty
      dispatch(
        usersActions.increase({
          id: product.id,
          price: product.price,
          name: product.title,
        })
      );
    } else {
      setIsInStock(false);
    }
  };

  const cancelDialogClick = () => {
    setIsInStock(true);
  };

  // Synchronize the amount item badge with the redux cart qty
  let qty = 0;
  const idx = cartProducts.findIndex((p) => p.id === product.id);
  if (idx !== -1) {
    qty = cartProducts[idx].qty;
  }

  // Determine stock message according to actual qty(soldout or number)
  const stock = product.stock;
  let message = `In Stock: ${stock}`;
  if (stock === 0) {
    message = "Sold Out";
  }

  return (
    <Card className={styles.item_container}>
      <div className={styles.description}>
        <h1>{product.title}</h1>
        <h2>{product.description}</h2>
        <h2>Price: {`${String.fromCharCode(0x20aa)}${product.price}`}</h2>
        <h2 className={stock > 0 ? undefined : styles.sold_out}>{message}</h2>

        <div className={styles.action_container}>
          <Button
            className={stock > 0 ? styles.action_btn : styles.disable}
            title="-"
            type="button"
            onClick={decrementQtyHandler}
          />
          <span className={stock > 0 ? styles.amount_display : styles.disable}>
            {qty}
          </span>
          <Button
            className={stock > 0 ? styles.action_btn : styles.disable}
            title="+"
            type="button"
            onClick={incrementQtyHandler}
          />
        </div>
      </div>

      <img
        src={product.image_link}
        alt={product.description}
        className={styles.img}
      />

      <p className={styles.bought}>
        <span>Bought: {numOfUsers}</span>
      </p>

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

export default UserProductItem;
