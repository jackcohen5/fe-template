// import { createSelector } from 'reselect'

const exampleStoreSelector = (state) => state.example

export const hasTriggeredExampleSelector = (state) =>
    exampleStoreSelector(state).get('hasTriggeredExample')

// export const memoizedSelector = createSelector(
//     exampleStoreSelector,
//     exampleStore => {
//         let result
//         for (let i = 0; i < 100; i++) {
//             result += i
//         }
//         return result
//     },
// )
