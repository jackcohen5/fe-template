import { call, put, spawn, takeEvery } from 'redux-saga/effects'

import { getAuthLock, ROLE_CLAIM_KEY, Roles } from './auth.constants'
import {
    checkingLogin,
    login,
    loginSuccess,
    loginFailed,
    logout,
    logoutSuccess,
    logoutFailed,
    signUp,
} from '.'

let AuthLock

function checkLogin() {
    return new Promise((resolve, reject) => {
        AuthLock.checkSession({}, (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

function* onAuthenticated({ accessToken, idTokenPayload }) {
    yield put(
        loginSuccess({
            user: {
                accessToken,
                email: idTokenPayload.email,
                roles: idTokenPayload[ROLE_CLAIM_KEY],
                isVerified: idTokenPayload.email_verified,
            },
        }),
    )
}

export function* checkLoginSaga() {
    try {
        yield put(checkingLogin())
        const authResult = yield call(checkLogin)
        yield call(onAuthenticated, authResult)
    } catch (e) {
        yield put(loginFailed())
    }
}

export function loginSaga(
    showParams,
    { payload: { role = Roles.nametbd_ROLE1 } = {} },
) {
    AuthLock = getAuthLock(role)
    AuthLock.show(showParams)
}

export function* logoutSaga() {
    try {
        AuthLock.logout()
        yield put(logoutSuccess())
    } catch (e) {
        yield put(logoutFailed())
    }
}

export default function* authWatcherSaga() {
    AuthLock = getAuthLock()

    yield takeEvery(signUp, loginSaga, {
        initialScreen: 'signUp',
        allowLogin: false,
    })
    yield takeEvery(login, loginSaga, {
        initialScreen: 'login',
        rememberLastLogin: true,
        allowSignUp: false,
    })
    yield takeEvery(logout, logoutSaga)
    yield spawn(checkLoginSaga)
}
