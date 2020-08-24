import { createSelector } from '@reduxjs/toolkit'

const exampleStoreSelector = (state) => state.example

export const hasTriggeredExampleSelector = (state) =>
    exampleStoreSelector(state).hasTriggeredExample

export const memoizedSelector = createSelector(
    hasTriggeredExampleSelector,
    (hasTriggeredExample) => {
        let result = hasTriggeredExample ? 1 : 0
        for (let i = 0; i < 100; i++) {
            result += i
        }
        return result
    },
)
