import { createReducer } from '@reduxjs/toolkit'

import { ApiCallState } from './apiExample.constants'
import {
    apiExampleAction,
    apiExampleActionSuccess,
    apiExampleActionFailure,
} from './actions'

const initialState = {
    apiExampleStatus: null,
    apiExampleResult: null,
}

const reducer = createReducer(initialState, {
    [apiExampleAction]: (state) => {
        state.apiExampleStatus = ApiCallState.Loading
        state.apiExampleResult = null
    },
    [apiExampleActionSuccess]: (state, action) => {
        state.apiExampleStatus = ApiCallState.Success
        state.apiExampleResult = action.payload
    },
    [apiExampleActionFailure]: (state, action) => {
        state.apiExampleStatus = ApiCallState.Failed
        state.apiExampleResult = action.payload
    },
})

export default reducer
