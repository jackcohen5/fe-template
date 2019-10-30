import { combineReducers } from 'redux'

import { reducer as exampleReducer } from './ducks/example'

export default combineReducers({
    example: exampleReducer,
    // ...
})
