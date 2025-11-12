import { createSlice } from '@reduxjs/toolkit';

const accessTokenSlice = createSlice({
    name: 'accessToken',
    initialState: {
        token: null,
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.token = action.payload;
        }
    }
})

export const { setAccessToken } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;