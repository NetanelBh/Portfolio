import styles from "./MealItem.module.css";

import ShekelSymbol from "../util/ShekelSymbol";
import CartContext from "../../store/CartContext";
import { useContext } from "react";

const MealItem = ({ meal }) => {
  const cartCtx = useContext(CartContext);
  const symbol = ShekelSymbol();

  const addMealToCart = () => {
    cartCtx.addItem(meal);
  };

  return (
    <li className={`${styles["meal-item"]}`}>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}></img>
        <div>
          <h3>{meal.name}</h3>
          <p className={`${styles["meal-item-price"]}`}>{symbol}{meal.price}</p>
          <p className={`${styles["meal-item-description"]}`}>
            {meal.description}
          </p>
        </div>
        <p className={`${styles["meal-item-actions"]}`}>
          <button onClick={addMealToCart}>Add to cart</button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
