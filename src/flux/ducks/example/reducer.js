import { createReducer } from '@reduxjs/toolkit'

import { exampleAction } from './actions'

const initialState = {
    hasTriggeredExample: false,
    someAdditionalFlag: false,
}

const reducer = createReducer(initialState, {
    [exampleAction]: state => {
        state.hasTriggeredExample = true
    },
})

export default reducer
