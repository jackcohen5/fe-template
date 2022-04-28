import configureStore from "flux/store"

import {
    apiExampleAction,
    apiExampleActionFailure,
    apiExampleActionSuccess,
    exampleApiIsLoadingSelector,
    exampleApiFailedSelector,
    exampleApiResultSelector,
    exampleApiSucceededSelector,
    hasTriggeredExampleApiSelector,
} from "."

describe("API Example duck", () => {
    let store

    beforeEach(() => {
        store = configureStore()
    })

    describe("API example action", () => {
        it("Toggles hasTriggeredExample flag", () => {
            expect(hasTriggeredExampleApiSelector(store.getState())).toBe(false)

            store.dispatch(apiExampleAction())
            expect(hasTriggeredExampleApiSelector(store.getState())).toBe(true)
        })

        it("Sets call state to loading", () => {
            expect(exampleApiIsLoadingSelector(store.getState())).toBe(false)

            store.dispatch(apiExampleAction())
            expect(exampleApiIsLoadingSelector(store.getState())).toBe(true)
        })
    })

    describe("Success action", () => {
        it("Sets result data", () => {
            const data = { some: "data" }
            const expectedData = JSON.stringify(data)
            expect(exampleApiResultSelector(store.getState())).toBe(
                "Nothing here"
            )

            store.dispatch(apiExampleActionSuccess(data))
            expect(exampleApiResultSelector(store.getState())).toBe(
                expectedData
            )
        })

        it("Sets call state to succeeded", () => {
            expect(exampleApiSucceededSelector(store.getState())).toBe(false)

            store.dispatch(apiExampleActionSuccess())
            expect(exampleApiSucceededSelector(store.getState())).toBe(true)
        })
    })

    describe("Failed action", () => {
        it("Sets result data", () => {
            const data = { some: "failure data" }
            const expectedData = JSON.stringify(data)
            expect(exampleApiResultSelector(store.getState())).toBe(
                "Nothing here"
            )

            store.dispatch(apiExampleActionFailure(data))
            expect(exampleApiResultSelector(store.getState())).toBe(
                expectedData
            )
        })

        it("Sets call state to failed", () => {
            expect(exampleApiFailedSelector(store.getState())).toBe(false)

            store.dispatch(apiExampleActionFailure())
            expect(exampleApiFailedSelector(store.getState())).toBe(true)
        })
    })
})
