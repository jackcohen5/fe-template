import { combineReducers } from 'redux'

import { reducer as apiExampleReducer } from './ducks/apiExample'
import { reducer as authReducer } from './ducks/auth'
import { reducer as exampleReducer } from './ducks/example'

export default combineReducers({
    apiExample: apiExampleReducer,
    auth: authReducer,
    example: exampleReducer,
    // ...
})
