import { createSlice } from "@reduxjs/toolkit";

const initialState = { categories: [] };

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    load(state, action) {
      state.categories = action.payload;
    },
  },
});

export const categoriesActions = categoriesSlice.actions;

export default categoriesSlice.reducer;
