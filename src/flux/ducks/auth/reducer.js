import { createReducer } from '@reduxjs/toolkit'

import { handleLogin } from './actions'

const initialState = {
    user: null,
}

const reducer = createReducer(initialState, {
    [handleLogin]: (state, action) => {
        const { user } = action.payload
        state.user = user
    },
})

export default reducer
