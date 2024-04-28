import { createSlice } from "@reduxjs/toolkit";

const initialState = {products: []};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    load(state, actions) {
      state.products = actions.payload;
    }
  }
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;