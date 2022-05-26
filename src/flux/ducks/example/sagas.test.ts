import { expectSaga } from "redux-saga-test-plan"
import { delay } from "redux-saga/effects"

import { exampleAction } from "."
import exampleWatcherSaga from "./sagas"

jest.mock("redux-saga/effects", () => ({
    ...jest.requireActual("redux-saga/effects"),
    delay: jest.fn(() => ({ execute: () => Promise.resolve() })),
}))

const mockedDelay = delay as jest.Mock

describe("Example duck sagas", () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it("Waits one second then alerts", async () => {
        const mockDelayFn = jest.fn()
        mockedDelay.mockImplementation(mockDelayFn)

        const mockAlertFn = jest.fn()
        jest.spyOn(window, "alert").mockImplementation(mockAlertFn)

        await expectSaga(exampleWatcherSaga)
            .dispatch(exampleAction())
            .silentRun()
            .then(() => {
                expect(mockDelayFn).toHaveBeenCalledWith(1000)
                expect(mockAlertFn).toHaveBeenCalledWith(
                    "side effect triggered"
                )
            })
    })
})
