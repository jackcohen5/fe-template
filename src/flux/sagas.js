import { spawn } from 'redux-saga/effects'

import authWatcherSaga from './ducks/auth/sagas'
import exampleWatcherSaga from './ducks/example/sagas'

export default function* rootSaga() {
    yield spawn(authWatcherSaga)
    yield spawn(exampleWatcherSaga)
}
