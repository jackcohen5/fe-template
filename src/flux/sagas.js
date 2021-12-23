import { spawn } from 'redux-saga/effects'

import apiExampleWatcherSaga from './ducks/apiExample/sagas'
import exampleWatcherSaga from './ducks/example/sagas'

export default function* rootSaga() {
    yield spawn(apiExampleWatcherSaga)
    yield spawn(exampleWatcherSaga)
}
