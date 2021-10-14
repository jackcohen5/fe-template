import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

import { reducer as apiExampleReducer } from './ducks/apiExample'
import { reducer as exampleReducer } from './ducks/example'

export default combineReducers({
    apiExample: apiExampleReducer,
    example: exampleReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    // ...
})
