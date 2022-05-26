import { createReducer } from "@reduxjs/toolkit"

import { exampleAction } from "./actions"

type ExampleStateType = {
    hasTriggeredExample: boolean
    someAdditionalFlag: boolean
}

const initialState: ExampleStateType = {
    hasTriggeredExample: false,
    someAdditionalFlag: false,
}

const reducer = createReducer(initialState, (builder) =>
    builder.addCase(exampleAction, (state) => {
        state.hasTriggeredExample = true
    })
)

export default reducer
