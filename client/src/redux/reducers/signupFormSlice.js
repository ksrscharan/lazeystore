import { createSlice } from '@reduxjs/toolkit';

const signupFormSlice = createSlice({
  initialState: {
    email: '',
    name: '',
    password: '',
  },
  name: 'signupForm',
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setEmail, setName, setPassword } = signupFormSlice.actions;
export default signupFormSlice.reducer;
