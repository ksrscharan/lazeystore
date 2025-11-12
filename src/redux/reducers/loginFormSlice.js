import { createSlice } from '@reduxjs/toolkit';

const loginFormSlice = createSlice({
  initialState: {
    password: '',
    username: '',
  },
  name: 'loginForm',
  reducers: {
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setPassword, setUsername } = loginFormSlice.actions;
export default loginFormSlice.reducer;
