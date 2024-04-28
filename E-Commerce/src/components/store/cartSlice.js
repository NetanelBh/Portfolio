import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: [], isOpen: false, totalPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase(state, action) {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index === -1) {
        state.products.push({
          id: action.payload.id,
          name: action.payload.name,
          qty: 1,
          price: action.payload.price,
        });
      } else {
        state.products[index].qty += 1;
      }

      state.totalPrice += +action.payload.price;
    },
    decrease(state, action) {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      // If there is only 1 product and we want to decrease, remove it from list
      if (state.products[index].qty === 1) {
        state.products.splice(index, 1);
      } else {
        state.products[index].qty -= 1;
      }

      // Reduce the total price
      state.totalPrice -= +action.payload.price;
    },
    removeProduct(state, action) {
      const index = state.products.findIndex((p) => p.id === action.payload);
      const totaPrice = state.products[index].qty * state.products[index].price;
      // Remove all item's qty from the products list
      state.products.splice(index, 1);
      // Calculate the total price
      state.totalPrice -= totaPrice;
    },
    showCart(state) {
      state.isOpen = !state.isOpen;
    },
    clearCart(state) {
      state.products.splice(0, state.products.length);
      state.isOpen = false;
      state.totalPrice = 0;
    }
  },
});

export const usersActions = cartSlice.actions;

export default cartSlice.reducer;
