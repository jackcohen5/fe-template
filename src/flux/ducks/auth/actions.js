const ns = (action) => `auth/${action}`

export const CHECKING_LOGIN = ns`CHECKING_LOGIN`

export const SIGN_UP = ns`SIGN_UP`

export const LOGIN = ns`LOGIN`
export const LOGIN_SUCCESS = ns`LOGIN_SUCCESS`
export const LOGIN_FAILED = ns`LOGIN_FAILED`

export const LOGOUT = ns`LOGOUT`
export const LOGOUT_SUCCESS = ns`LOGOUT_SUCCESS`
export const LOGOUT_FAILED = ns`LOGOUT_FAILED`

export const checkingLogin = () => ({ type: CHECKING_LOGIN })

export const signUp = (role) => ({
    type: SIGN_UP,
    payload: { role },
})

export const login = () => ({
    type: LOGIN,
})

export const loginSuccess = ({ isVerified, user }) => ({
    type: LOGIN_SUCCESS,
    payload: { isVerified, user },
})

export const loginFailed = () => ({
    type: LOGIN_FAILED,
})

export const logout = () => ({
    type: LOGOUT,
})

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
})

export const logoutFailed = () => ({
    type: LOGOUT_FAILED,
})
