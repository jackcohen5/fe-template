import { takeEvery } from 'redux-saga/effects'
import LogRocket from 'logrocket'

import { handleLogin } from 'flux/ducks/auth'

const identifyToLogrocket = ({
    payload: {
        user: { email },
    },
}) => {
    LogRocket.identify(email, {
        email,
    })
}

export default function* loggingWatcherSaga() {
    if (process.env.NODE_ENV !== 'development') {
        yield takeEvery(handleLogin, identifyToLogrocket)
    }
}
