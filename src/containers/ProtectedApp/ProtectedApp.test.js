import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'

import { BrowserRouter as Router } from 'react-router-dom'

import routes from 'routes'

import { useHandleLogin } from './hooks'

import { UnwrappedProtectedApp as ProtectedApp } from '.'

jest.mock('containers/App', () => {
    return {
        __esModule: true,
        default: () => {
            return <div>App Container</div>
        },
    }
})

jest.mock('./hooks')

const defaultProps = {
    isVerified: true,
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
        useHandleLogin.mockReturnValue({
            logout: mockLogout,
        })
    })

    it('Renders link to public app', () => {
        renderComponent()
        const expectedLabel = 'Go to public app'
        const link = screen.getByRole('link', { name: expectedLabel })
        expect(link).toHaveAttribute('href', routes.HOME)
        expect(link).toHaveTextContent(expectedLabel)
    })

    it('Renders app container if verified', () => {
        renderComponent({ isVerified: true })
        expect(screen.getByText('App Container')).toBeDefined()
    })

    it('Renders verification prompt if unverified', () => {
        renderComponent({ isVerified: false })
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
