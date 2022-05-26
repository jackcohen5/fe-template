import { delay, takeEvery } from "redux-saga/effects"

import { exampleAction } from "."

export function* triggerExampleSaga() {
    yield delay(1000)
    alert("side effect triggered")
}

export default function* exampleWatcherSaga() {
    yield takeEvery(exampleAction, triggerExampleSaga)
}
