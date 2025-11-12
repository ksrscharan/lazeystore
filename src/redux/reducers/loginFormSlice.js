import { createSlice } from "@reduxjs/toolkit";

const loginFormSlice = createSlice({
  name: "loginForm",
  initialState: {
    username: "",
    password: "",
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setUsername, setPassword } = loginFormSlice.actions;
export default loginFormSlice.reducer;
