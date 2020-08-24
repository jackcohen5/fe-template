import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'example',
    initialState: {
        hasTriggeredExample: false,
    },
    reducers: {
        exampleAction: (state) => {
            state.hasTriggeredExample = true
        },
    },
})

export default slice
