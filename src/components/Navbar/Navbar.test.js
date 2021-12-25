import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import { useRouteMatch } from 'react-router'
import { useSigninCheck, useFirestoreDocData, useFirestore } from 'reactfire'
import { BrowserRouter as Router } from 'react-router-dom'

import { useLogout } from 'flux/ducks/auth'
import routes from 'routes'

import Navbar from '.'

jest.mock('firebase/firestore')
jest.mock('reactfire')
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useRouteMatch: jest.fn(),
}))
jest.mock('flux/ducks/auth')

const renderComponent = () =>
    render(
        <Router>
            <Navbar />
        </Router>,
    )

const mockUid = 'some-user-uuid'

describe('Navbar', () => {
    beforeEach(() => {
        jest.resetAllMocks()

        useFirestore.mockReturnValue(null)
        useRouteMatch.mockReturnValue({
            path: routes.HOME,
        })
        useSigninCheck.mockReturnValue({
            status: 'success',
            data: { signedIn: true, user: { uid: mockUid } },
        })
        useFirestoreDocData.mockReturnValue({
            status: 'success',
            data: { firstName: 'Obi Wan', lastName: 'Kenobi' },
        })
    })

    it('Does not render nav actions if sign in check loading', () => {
        useSigninCheck.mockReturnValue({ status: 'loading' })

        renderComponent()
        expect(screen.queryByTestId('nav-actions-wrapper')).toBeNull()
    })

    it('Renders avatar, name and logout button if signed in', () => {
        const mockLogout = jest.fn()
        useLogout.mockReturnValue(mockLogout)

        renderComponent()
        expect(screen.queryByTestId('nav-actions-wrapper')).not.toBeNull()
        expect(screen.queryByAltText('Avatar')).not.toBeNull()
        expect(screen.queryByLabelText('Logout')).not.toBeNull()
        expect(screen.queryByText('Obi Wan Kenobi')).not.toBeNull()
        UserEvent.click(screen.getByRole('button', { name: 'Logout' }))
        expect(mockLogout).toHaveBeenCalled()
    })

    it('Renders login button if not signed in', () => {
        useSigninCheck.mockReturnValue({
            status: 'success',
            data: { signedIn: false, user: null },
        })
        renderComponent()
        expect(screen.queryByTestId('nav-actions-wrapper')).not.toBeNull()
        expect(screen.queryByLabelText('Login')).not.toBeNull()
    })

    it('Does not render login button if on login page', () => {
        useRouteMatch.mockReturnValue({
            path: routes.LOGIN,
        })
        useSigninCheck.mockReturnValue({
            status: 'success',
            data: { signedIn: false, user: null },
        })
        renderComponent()
        expect(screen.queryByTestId('nav-actions-wrapper')).not.toBeNull()
        expect(screen.queryByLabelText('Login')).toBeNull()
    })
})