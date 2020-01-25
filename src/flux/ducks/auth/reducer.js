import Immutable from 'immutable'

import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    CHECKING_LOGIN,
} from './actions'
import { AuthState } from './auth.constants'

const emptyMap = new Immutable.Map()

const initialState = new Immutable.Map({
    authState: AuthState.LOGGED_OUT,
    isCheckingLogin: false,
    user: emptyMap,
})

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECKING_LOGIN:
            return state.set('isCheckingLogin', true)
        case LOGIN:
            return state.set('authState', AuthState.LOGGING_IN)
        case LOGIN_SUCCESS:
            return state.withMutations(s =>
                s
                    .set('authState', AuthState.LOGGED_IN)
                    .set('isCheckingLogin', false)
                    .set('user', Immutable.fromJS(action.payload.user)),
            )
        case LOGOUT:
            return state.set('authState', AuthState.LOGGING_OUT)
        case LOGOUT_SUCCESS:
        case LOGIN_FAILED:
        case LOGOUT_FAILED:
            return initialState
        default:
            return state
    }
}
