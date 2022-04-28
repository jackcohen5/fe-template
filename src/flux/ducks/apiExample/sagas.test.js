import { expectSaga } from "redux-saga-test-plan"
import { delay } from "redux-saga/effects"

import Fetch from "services/Fetch"

import {
    apiExampleAction,
    apiExampleActionSuccess,
    apiExampleActionFailure,
} from "."
import apiExampleWatcherSaga from "./sagas"

jest.mock("redux-saga/effects", () => ({
    ...jest.requireActual("redux-saga/effects"),
    delay: jest.fn(() => ({ execute: () => Promise.resolve() })),
}))
jest.mock("services/Fetch")

describe("Example duck sagas", () => {
    beforeEach(() => {
        jest.resetAllMocks()
        delay.mockImplementation(jest.fn())
    })

    it("Waits one second then triggers fetch", async () => {
        await expectSaga(apiExampleWatcherSaga)
            .dispatch(apiExampleAction())
            .silentRun()
            .then(() => {
                expect(delay).toHaveBeenCalledWith(1000)
                expect(Fetch).toHaveBeenCalledWith({
                    method: "GET",
                    path: "/example",
                })
            })
    })

    it("Dispatches success action on fetch success", async () => {
        const result = { some: "result" }
        Fetch.mockResolvedValue(result)

        await expectSaga(apiExampleWatcherSaga)
            .dispatch(apiExampleAction())
            .put(apiExampleActionSuccess(result))
            .silentRun()
            .then(() => {
                expect(Fetch).toHaveBeenCalledWith({
                    method: "GET",
                    path: "/example",
                })
            })
    })

    it("Dispatches success action on fetch failure", async () => {
        const errorMessage = "Some Error"
        Fetch.mockRejectedValue(new Error(errorMessage))

        await expectSaga(apiExampleWatcherSaga)
            .dispatch(apiExampleAction())
            .put(apiExampleActionFailure({ message: errorMessage }))
            .silentRun()
            .then(() => {
                expect(Fetch).toHaveBeenCalledWith({
                    method: "GET",
                    path: "/example",
                })
            })
    })
})
