import { createAction } from '@reduxjs/toolkit'

const ns = (action) => `auth/${action}`

export const checkingLogin = createAction(ns`CHECKING_LOGIN`)

export const signUp = createAction(ns`SIGN_UP`)

export const login = createAction(ns`LOGIN`)
export const loginSuccess = createAction(ns`LOGIN_SUCCESS`)
export const loginFailed = createAction(ns`LOGIN_FAILED`)

export const logout = createAction(ns`LOGOUT`)
export const logoutSuccess = createAction(ns`LOGOUT_SUCCESS`)
export const logoutFailed = createAction(ns`LOGOUT_FAILED`)
