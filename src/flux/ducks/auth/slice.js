import { createSlice } from '@reduxjs/toolkit'

import { AuthState } from './auth.constants'

const resetState = (state) => {
    state.authState = AuthState.LOGGED_OUT
    state.isCheckingLogin = false
    state.user = null
}

const slice = createSlice({
    name: 'auth',
    initialState: {
        authState: AuthState.LOGGED_OUT,
        isCheckingLogin: false,
        user: null,
    },
    reducers: {
        checkingLogin: (state) => {
            state.isCheckingLogin = true
        },
        signUp: () => {},
        login: (state) => {
            state.authState = AuthState.LOGGING_IN
        },
        loginSuccess: (state, action) => {
            const { user } = action.payload
            state.authState = AuthState.LOGGED_IN
            state.isCheckingLogin = false
            state.user = user
        },
        loginFailed: resetState,
        logout: (state) => {
            state.authState = AuthState.LOGGING_OUT
        },
        logoutSuccess: resetState,
        logoutFailed: resetState,
    },
})

export default slice
