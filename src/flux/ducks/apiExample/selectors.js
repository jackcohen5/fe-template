import { ApiCallState } from './apiExample.constants'

const apiExampleStoreSelector = (state) => state.apiExample

export const apiExampleStatusSelector = (state) =>
    apiExampleStoreSelector(state).apiExampleStatus

export const hasTriggeredExampleApiSelector = (state) =>
    Boolean(apiExampleStatusSelector(state))

export const exampleApiIsLoadingSelector = (state) =>
    apiExampleStatusSelector(state) === ApiCallState.Loading

export const exampleApiSucceededSelector = (state) =>
    apiExampleStatusSelector(state) === ApiCallState.Success

export const exampleApiFailedSelector = (state) =>
    apiExampleStatusSelector(state) === ApiCallState.Failed

export const exampleApiResultSelector = (state) => {
    const res = apiExampleStoreSelector(state).apiExampleResult
    return res ? JSON.stringify(res) : 'Nothing here'
}
