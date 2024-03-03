import { useContext, useEffect } from "react";

import styles from "./Header.module.css";

import logo from "../../assets/logo.jpg";
import HeaderCartButton from "./HeaderCartButton";
import CartContext from "../../store/CartContext";
import UserProgressContext from "../../store/UserProgressContext";

const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce(
    (totalNumberOfMeals, currentItem) => {
      return totalNumberOfMeals + currentItem.quantity;
    },
    0
  );

  const showCartHandler = () => {
    userProgressCtx.showCart();
  };

  return (
    <header>
      <div className={styles.title}>
        <img src={logo} alt="Website logo" />
        <h1>NETANEL'S FOOD</h1>
      </div>
      <HeaderCartButton
        cssClass={"button"}
        items={cartCtx.items}
        onClick={showCartHandler}
      >
        {totalCartItems}
      </HeaderCartButton>
    </header>
  );
};

export default Header;
