import { combineReducers } from 'redux'

import { reducer as authReducer } from './ducks/auth'
import { reducer as exampleReducer } from './ducks/example'

export default combineReducers({
    auth: authReducer,
    example: exampleReducer,
    // ...
})
