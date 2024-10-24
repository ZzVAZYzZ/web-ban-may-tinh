import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/counter/productsSlice';
import cartReducer from './features/counter/cartSlice';
import userReducer from './features/counter/userSlice';
import stepbarReducer from './processes/stepbarSlice';
import postTransactionReducer from './API/postTransactionSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    stepbar: stepbarReducer,
    postTransaction: postTransactionReducer,
  },
})

