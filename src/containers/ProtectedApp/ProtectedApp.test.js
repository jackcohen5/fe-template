import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import { useFirebase } from 'react-redux-firebase'

import { BrowserRouter as Router } from 'react-router-dom'

import { UnwrappedProtectedApp as ProtectedApp } from '.'

jest.mock('react-redux-firebase')
jest.mock('containers/App', () => {
    return {
        __esModule: true,
        default: () => {
            return <div>App Container</div>
        },
    }
})

const defaultProps = {
    isEmailVerified: true,
}

const renderComponent = (props = {}) =>
    render(
        <Router>
            <ProtectedApp {...defaultProps} {...props} />
        </Router>,
    )

describe('ProtectedApp', () => {
    let mockLogout
    beforeEach(() => {
        jest.resetAllMocks()
        mockLogout = jest.fn()
        useFirebase.mockReturnValue({
            logout: mockLogout,
        })
    })

    it('Renders app container if verified', () => {
        renderComponent({ isEmailVerified: true })
        expect(screen.getByText('App Container')).toBeDefined()
    })

    it('Renders verification prompt if unverified', () => {
        renderComponent({ isEmailVerified: false })
        expect(
            screen.getByText('Check your inbox for your verification email.'),
        ).toBeDefined()
    })

    it('Triggers logout on button click', () => {
        renderComponent()
        UserEvent.click(screen.getByRole('button', { name: 'Logout' }))
        expect(mockLogout).toHaveBeenCalled()
    })
})
