import { createSlice } from '@reduxjs/toolkit'

const signupFormSlice = createSlice({
    initialState: {
        name: '',
        email: '',
        password: '',
    },
    name: 'signupForm',
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
    }
})

export const { setName, setEmail, setPassword } = signupFormSlice.actions
export default signupFormSlice.reducer;