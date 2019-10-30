import { delay, takeEvery } from 'redux-saga/effects'

import { EXAMPLE_ACTION } from './actions'

export function* hasTriggeredExampleSaga() {
    yield delay(1000)
    alert('side effect triggered')
}

export default function* exampleWatcherSaga() {
    yield takeEvery(EXAMPLE_ACTION, hasTriggeredExampleSaga)
}
