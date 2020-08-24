import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import LogRocket from 'logrocket'

import rootReducer from './reducer'
import rootSaga from './sagas'

export default () => {
    const sagaMiddleware = createSagaMiddleware()
    const store = configureStore({
        reducer: rootReducer,
        middleware: [sagaMiddleware, LogRocket.reduxMiddleware()],
    })
    sagaMiddleware.run(rootSaga)
    return store
}
