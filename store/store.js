import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slice/cartSlice';
import userSlice from './slice/userSlice';
import locationSlice from './slice/locationSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
    location: locationSlice
  },
});
