import { createSlice } from '@reduxjs/toolkit';

const signupFormSlice = createSlice({
  initialState: {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
  },
  name: 'signupForm',
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setFirstname: (state, action) => {
      state.firstname = action.payload;
    },
    setLastname: (state, action) => {
      state.lastname = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setEmail, setFirstname, setLastname, setPassword } = signupFormSlice.actions;
export default signupFormSlice.reducer;
