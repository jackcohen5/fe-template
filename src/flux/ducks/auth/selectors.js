import { AuthState } from './auth.constants'

const authStoreSelector = (state) => state.auth

export const isCheckingLoginSelector = (state) =>
    authStoreSelector(state).isCheckingLogin

export const isLoggedInSelector = (state) =>
    authStoreSelector(state).authState === AuthState.LOGGED_IN

export const isLoggingInSelector = (state) =>
    authStoreSelector(state).authState === AuthState.LOGGING_IN

export const userSelector = (state) => authStoreSelector(state).user

export const accessTokenSelector = (state) => userSelector(state)?.accessToken

export const userRolesSelector = (state) => userSelector(state)?.roles ?? []

export const isVerifiedSelector = (state) =>
    userSelector(state)?.isVerified ?? false
