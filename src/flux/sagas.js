import { spawn } from 'redux-saga/effects'

import exampleWatcherSaga from './ducks/example/sagas'
import loggingWatcherSaga from './ducks/logging/sagas'

export default function* rootSaga() {
    yield spawn(exampleWatcherSaga)
    yield spawn(loggingWatcherSaga)
}
