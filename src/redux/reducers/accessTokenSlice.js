import { createSlice } from '@reduxjs/toolkit';

const accessTokenSlice = createSlice({
  initialState: {
    token: null,
  },
  name: 'accessToken',
  reducers: {
    setAccessToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setAccessToken } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;
