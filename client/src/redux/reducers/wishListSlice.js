import { createSlice } from '@reduxjs/toolkit';

const wishListSlice = createSlice({
  initialState: {
    items: [],
  },
  name: 'wishList',
  reducers: {
    addToWishList: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromWishList: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});
export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
