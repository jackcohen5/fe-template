import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'

import routes from 'routes'

import { UnwrappedApp as App } from '.'

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}))

const defaultProps = {
    exampleAction: () => {},
    hasTriggeredExample: false,
    isLoggedIn: false,
}

const renderComponent = (props = {}) =>
    render(
        <Router>
            <App {...defaultProps} {...props} />
        </Router>,
    )

describe('App', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        useLocation.mockReturnValue({
            pathname: routes.HOME,
        })
    })

    it('Untriggered example displays correct description', () => {
        renderComponent({ hasTriggeredExample: false })
        expect(
            screen.getByText('Example has NOT been triggered', {
                exact: false,
            }),
        ).toBeDefined()
    })

    it('Triggered example displays correct description', () => {
        renderComponent({ hasTriggeredExample: true })
        expect(
            screen.getByText('Example has been triggered', {
                exact: false,
            }),
        ).toBeDefined()
    })

    it('Calls exampleAction on button click', () => {
        const exampleActionSpy = jest.fn()
        renderComponent({ exampleAction: exampleActionSpy })
        UserEvent.click(screen.getByRole('button', { name: 'Trigger Example' }))
        expect(exampleActionSpy).toHaveBeenCalled()
    })

    it.each`
        currentRoute             | label        | expectedRoute
        ${routes.HOME}           | ${'private'} | ${routes.PROTECTED_HOME}
        ${routes.PROTECTED_HOME} | ${'public'}  | ${routes.HOME}
    `(
        'Displays a link to $expectedRoute when current route is $currentRoute',
        ({ currentRoute, label, expectedRoute }) => {
            useLocation.mockReturnValue({
                pathname: currentRoute,
            })
            renderComponent()
            const expectedLabel = `Go to ${label} app`
            const link = screen.getByRole('link', { name: expectedLabel })
            expect(link).toHaveAttribute('href', expectedRoute)
            expect(link).toHaveTextContent(expectedLabel)
        },
    )
})
