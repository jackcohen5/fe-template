import { combineReducers } from 'redux'

import { reducer as apiExampleReducer } from './ducks/apiExample'
import { reducer as exampleReducer } from './ducks/example'

export default combineReducers({
    apiExample: apiExampleReducer,
    example: exampleReducer,
    // ...
})
