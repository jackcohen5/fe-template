export * from './auth.constants'
import slice from './slice'
export const reducer = slice.reducer
export const {
    checkingLogin,
    signUp,
    login,
    loginSuccess,
    loginFailed,
    logout,
    logoutSuccess,
    logoutFailed,
} = slice.actions
export * from './selectors'
