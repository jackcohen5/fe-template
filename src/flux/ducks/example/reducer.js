import { createReducer } from '@reduxjs/toolkit'

import { checkingLogin } from 'src/flux/ducks/auth'
import { exampleAction } from './actions'

const initialState = {
    hasTriggeredExample: false,
    someAdditionalFlag: false,
}

const reducer = createReducer(initialState, {
    [exampleAction]: (state) => {
        state.hasTriggeredExample = true
    },
    [checkingLogin]: (state) => {
        state.someAdditionalFlag = true
    },
})

export default reducer
