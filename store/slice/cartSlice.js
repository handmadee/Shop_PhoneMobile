import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  cart: [],
};
export const cartSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingItem = state.cart.find(item => item.id == action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeProduct: (state, action) => {
      const {id} = action.payload;
      state.cart = state.cart.filter(item => item.id !== id);
    },
    clearCart: state => {
      state.cart = [];
    },
    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      console.log(id);
      const existingItem = state.cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        throw new Error('Không tìm thấy ID');
      }
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.cart.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        existingItem.quantity = 1;
      }
    },
  },
});

export const selectTotalPrice = state => {
  const cartItems = state.cart.cart;
  if (cartItems && cartItems.length > 0) {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  return 0;
};
export const selectCartData = state => state.cart.cart;
export const { addProduct, removeProduct, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
