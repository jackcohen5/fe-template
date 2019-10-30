import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducer'
import rootSaga from './sagas'

const composeEnhancersWithDevTools = composeWithDevTools({
    name: 'fe-nametbd',
})

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        rootReducer,
        process.env.NODE_ENV === 'development'
            ? composeEnhancersWithDevTools(applyMiddleware(sagaMiddleware))
            : applyMiddleware(sagaMiddleware),
    )
    sagaMiddleware.run(rootSaga)
    return store
}
