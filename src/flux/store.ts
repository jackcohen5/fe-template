import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import LogRocket from "logrocket"

import rootReducer from "./reducer"
import rootSaga from "./sagas"

const createStore = () => {
    const sagaMiddleware = createSagaMiddleware()
    const store = configureStore({
        reducer: rootReducer,
        middleware: [sagaMiddleware, LogRocket.reduxMiddleware()],
    })
    sagaMiddleware.run(rootSaga)
    return store
}

export const store = createStore()

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>

export default createStore
