import { delay, put, takeEvery } from "redux-saga/effects"

import Fetch from "services/Fetch"

import {
    apiExampleAction,
    apiExampleActionFailure,
    apiExampleActionSuccess,
} from "./actions"

export function* triggerExampleApiSaga() {
    try {
        yield delay(1000)
        const exampleResult: unknown = yield Fetch({
            method: "GET",
            path: "/example",
        })
        yield put(apiExampleActionSuccess(exampleResult))
    } catch (e) {
        yield put(apiExampleActionFailure({ message: e.message }))
    }
}

export default function* apiExampleWatcherSaga() {
    yield takeEvery(apiExampleAction, triggerExampleApiSaga)
}
