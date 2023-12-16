import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inforOrder: {
    id:'',
    name: '',
    city: '',
    district: '',
    location: '',
    phone: ''
  },
};

export const locationSlice = createSlice({
  name: 'location', 
  initialState,
  reducers: {
    addlocation: (state, action) => {
      state.inforOrder = { ...action.payload };
    }
  },
});


export const selectlocation = state => state.location.inforOrder;
export const { addlocation } = locationSlice.actions;
export default locationSlice.reducer;
