import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: '',
    name: '',
    phone: '',
    type: '',
    userName: ''
  },
  statusLogin: false
};

export const userSlice = createSlice({
  name: 'user', 
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = { ...action.payload };
    },
    isLogin: (state, action) => {
      state.statusLogin = action.payload;
    }
  },
});


export const selectUser = state => state.user.user;
export const sttLogin = state => state.user.statusLogin;
export const idUser = state => state.user.user.id; 


export const { addUser, isLogin, } = userSlice.actions;

export default userSlice.reducer;
