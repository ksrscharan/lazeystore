import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  initialState: {
    products: [],
  },
  name: 'products',
  reducers: {
    pushProducts: (state, action) => {
      state.products.concat(action.payload);
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { pushProducts, setProducts } = productsSlice.actions;
export default productsSlice.reducer;
