import configureStore from 'flux/store'

import { handleLogin, userSelector } from '.'

describe('Auth duck', () => {
    let store

    beforeEach(() => {
        store = configureStore()
    })

    it('Stores user on handling login', () => {
        const user = {
            name: 'Obi Wan Kenobi',
        }
        expect(userSelector(store.getState())).toBeNull()
        store.dispatch(handleLogin({ user }))
        expect(userSelector(store.getState())).toStrictEqual(user)
    })
})
