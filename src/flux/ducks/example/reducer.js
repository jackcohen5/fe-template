import Immutable from 'immutable'

import { EXAMPLE_ACTION } from './actions'

const initialState = new Immutable.Map({
    hasTriggeredExample: false,
})

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case EXAMPLE_ACTION:
            return state.set('hasTriggeredExample', true)
        default:
            return state
    }
}
