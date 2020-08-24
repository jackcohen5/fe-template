import { spawn } from 'redux-saga/effects'

import authWatcherSaga from './ducks/auth/sagas'
import exampleWatcherSaga from './ducks/example/sagas'
import loggingWatcherSaga from './ducks/logging/sagas'

export default function* rootSaga() {
    yield spawn(authWatcherSaga)
    yield spawn(exampleWatcherSaga)
    yield spawn(loggingWatcherSaga)
}
