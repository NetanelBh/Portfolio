import styles from './CartItem.module.css';

import ShekelSymbol from '../util/ShekelSymbol';
import CartContext from '../../store/CartContext';
import { useContext } from 'react';

const CartItem = ({name, quantity, price, onIncreaseItem, onDecreaseItem}) => {
  const shekelSymbol = ShekelSymbol();

  return (
    <li className={`${styles["cart-item"]}`}>
      <p>
        {name} - {quantity} x {shekelSymbol}{price}
      </p>
      <p className={`${styles['cart-item-actions']}`}>
        <button onClick={onDecreaseItem}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncreaseItem}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
