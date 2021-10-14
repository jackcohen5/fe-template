import { takeEvery } from 'redux-saga/effects'
import LogRocket from 'logrocket'
import { constants } from 'react-redux-firebase'

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
        yield takeEvery(constants.actionTypes.LOGIN, identifyToLogrocket)
    }
}
