import {configureStore} from '@reduxjs/toolkit';

import cartReducer from './cartSlice';
import usersReducer from './usersSlice';
import ordersReducer from './ordersSlice';
import productsReducer from './productsSlice';
import categoriesReducer from './categoriesSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    users: usersReducer,
    orders: ordersReducer,
    products: productsReducer,
    categories: categoriesReducer,
  }
})

export default store;