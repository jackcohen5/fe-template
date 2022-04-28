import configureStore from "flux/store"

import { exampleAction, hasTriggeredExampleSelector } from "."

describe("Example duck", () => {
    let store

    beforeEach(() => {
        store = configureStore()
    })

    it("Example action toggles hasTriggeredExample flag", () => {
        expect(hasTriggeredExampleSelector(store.getState())).toBe(false)
        store.dispatch(exampleAction())
        expect(hasTriggeredExampleSelector(store.getState())).toBe(true)
    })
})
