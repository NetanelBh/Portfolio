import { createSlice } from "@reduxjs/toolkit";

const initialState = {orders: []};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    load(state, actions) {
      state.orders = actions.payload;
    },
  },
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice.reducer;