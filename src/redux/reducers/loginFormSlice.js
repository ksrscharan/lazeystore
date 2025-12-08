import { createSlice } from '@reduxjs/toolkit';

const loginFormSlice = createSlice({
  initialState: {
    email: '',
    password: '',
  },
  name: 'loginForm',
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setEmail, setPassword } = loginFormSlice.actions;
export default loginFormSlice.reducer;
