import { ApiCallState } from "./apiExample.constants"

import { AppState } from "flux/store"

const apiExampleStoreSelector = (state: AppState) => state.apiExample

export const apiExampleStatusSelector = (state: AppState) =>
    apiExampleStoreSelector(state).apiExampleStatus

export const hasTriggeredExampleApiSelector = (state: AppState) =>
    Boolean(apiExampleStatusSelector(state))

export const exampleApiIsLoadingSelector = (state: AppState) =>
    apiExampleStatusSelector(state) === ApiCallState.Loading

export const exampleApiSucceededSelector = (state: AppState) =>
    apiExampleStatusSelector(state) === ApiCallState.Success

export const exampleApiFailedSelector = (state: AppState) =>
    apiExampleStatusSelector(state) === ApiCallState.Failed

export const exampleApiResultSelector = (state: AppState) => {
    const res = apiExampleStoreSelector(state).apiExampleResult
    return res ? JSON.stringify(res) : "Nothing here"
}
