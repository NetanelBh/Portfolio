import styles from "./HeaderCartButton.module.css";

import { useEffect, useState } from "react";
import CartIcon from "../cart/CartIcon";

const HeaderCartButton = ({ children, cssClass, items, onClick}) => {
  const [addedNewMeal, setAddedNewMeal] = useState(false);

  const classes = `${styles[cssClass]} ${addedNewMeal ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setAddedNewMeal(true);

    const timer = setTimeout(() => {
      setAddedNewMeal(false);
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={classes} onClick={onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span className={styles.title}>{children}</span>
    </button>
  );
};

export default HeaderCartButton;
