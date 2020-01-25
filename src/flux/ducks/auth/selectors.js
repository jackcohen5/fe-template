import Immutable from 'immutable'

import { AuthState } from './auth.constants'

export const emptyMap = new Immutable.Map()
export const emptyList = new Immutable.List()

const authStoreSelector = state => state.auth

export const isCheckingLoginSelector = state =>
    authStoreSelector(state).get('isCheckingLogin')

export const isLoggedInSelector = state =>
    authStoreSelector(state).get('authState') === AuthState.LOGGED_IN

export const isLoggingInSelector = state =>
    authStoreSelector(state).get('authState') === AuthState.LOGGING_IN

export const userSelector = state => authStoreSelector(state).get('user')

export const accessTokenSelector = state =>
    userSelector(state).get('accessToken')

export const userRolesSelector = state =>
    userSelector(state).get('roles', emptyList)

export const isVerifiedSelector = state =>
    userSelector(state).get('isVerified', false)
