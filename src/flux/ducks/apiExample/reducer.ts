import { createReducer } from "@reduxjs/toolkit"

import { ApiCallState } from "./apiExample.constants"
import {
    apiExampleAction,
    apiExampleActionFailure,
    apiExampleActionSuccess,
} from "./actions"

type ApiExampleStateType = {
    apiExampleStatus?: ApiCallState
    apiExampleResult?: unknown
}

const initialState: ApiExampleStateType = {
    apiExampleStatus: null,
    apiExampleResult: null,
}

const reducer = createReducer(initialState, (builder) =>
    builder
        .addCase(apiExampleAction, (state) => {
            state.apiExampleStatus = ApiCallState.Loading
            state.apiExampleResult = null
        })
        .addCase(apiExampleActionSuccess, (state, action) => {
            state.apiExampleStatus = ApiCallState.Success
            state.apiExampleResult = action.payload
        })
        .addCase(apiExampleActionFailure, (state, action) => {
            state.apiExampleStatus = ApiCallState.Failed
            state.apiExampleResult = action.payload
        })
)

export default reducer
