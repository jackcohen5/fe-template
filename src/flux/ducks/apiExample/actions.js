import { createAction } from "@reduxjs/toolkit"

const ns = (action) => `apiExample/${action}`

export const apiExampleAction = createAction(ns`API_EXAMPLE_ACTION`)
export const apiExampleActionSuccess = createAction(
    ns`API_EXAMPLE_ACTION_SUCCESS`
)
export const apiExampleActionFailure = createAction(
    ns`API_EXAMPLE_ACTION_FAILURE`
)
