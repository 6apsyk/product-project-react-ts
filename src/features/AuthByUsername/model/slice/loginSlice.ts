import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginByUsername } from '../services/loginByUsename/loginByUsename'
import { LoginSchema } from '../types/loginSchema'

const initialState: LoginSchema  = {
    isLoading: false,
    password: '',
    username: '',
    error: ''
}

export const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setUsername: (state, actions: PayloadAction<string>) => {
            state.username = actions.payload
        },
        setPassword: (state, actions: PayloadAction<string>) => {
            state.password = actions.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(loginByUsername.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

// Action creators are generated for each case reducer function
export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice
