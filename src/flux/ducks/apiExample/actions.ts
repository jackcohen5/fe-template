import { createAction } from "@reduxjs/toolkit"

const ns = (action: TemplateStringsArray) => `apiExample/${action}`

export const apiExampleAction = createAction(ns`API_EXAMPLE_ACTION`)
export const apiExampleActionSuccess = createAction<unknown>(
    ns`API_EXAMPLE_ACTION_SUCCESS`
)
export const apiExampleActionFailure = createAction<{ message: string }>(
    ns`API_EXAMPLE_ACTION_FAILURE`
)
