import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: item => {},
  removeItem: id => {},
  clearCart: () => {},
});

const INIT_CART = { items: [] };

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    // Will check if the item already exist in cart, if so, will increase it
    const existCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );

    const updatedItemsList = [...state.items];
    if (existCartItemIndex > -1) {
      // Get the item from the list
      const existingItem = state.items[existCartItemIndex];
      // Update the item with the new values
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItemsList[existCartItemIndex] = updatedItem;
    } else {
      updatedItemsList.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItemsList };
  } else if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      item => item.id === action.id
    );

    const updatedItems = [...state.items];
    const existingCartItem = updatedItems[existingItemIndex];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updatedItems[existingItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  } else {
    return INIT_CART;
  }
};

export const CartContextProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, INIT_CART);
  
  const addItem = (item) => {
    dispatchCartAction({type: 'ADD_ITEM', item: item});
  };
  
  const removeItem = (id) => {
    dispatchCartAction({type: 'REMOVE_ITEM', id});
  };
  
  const clearCart = () => {
    dispatchCartAction({type: 'CLEAR_CART'});
  };

  const cartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
