import { createReducer } from '@reduxjs/toolkit'

import {
    checkingLogin,
    login,
    loginFailed,
    loginSuccess,
    logout,
    logoutFailed,
    logoutSuccess,
    signUp,
} from './actions'
import { AuthState } from './auth.constants'

const initialState = {
    authState: AuthState.LOGGED_OUT,
    isCheckingLogin: false,
    user: null,
}

const resetState = (state) => {
    state.authState = AuthState.LOGGED_OUT
    state.isCheckingLogin = false
    state.user = null
}

const reducer = createReducer(initialState, {
    [checkingLogin]: (state) => {
        state.isCheckingLogin = true
    },
    [signUp]: () => {},
    [login]: (state) => {
        state.authState = AuthState.LOGGING_IN
    },
    [loginSuccess]: (state, action) => {
        const { user } = action.payload
        state.authState = AuthState.LOGGED_IN
        state.isCheckingLogin = false
        state.user = user
    },
    [loginFailed]: resetState,
    [logout]: (state) => {
        state.authState = AuthState.LOGGING_OUT
    },
    [logoutSuccess]: resetState,
    [logoutFailed]: resetState,
})

export default reducer
