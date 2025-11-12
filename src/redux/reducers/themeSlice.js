import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  initialState: {
    mode: 'light',
  },
  name: 'theme',
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
