import { spawn } from 'redux-saga/effects'

import exampleWatcherSaga from './ducks/example/sagas'

export default function* rootSaga() {
    yield spawn(exampleWatcherSaga)
}
