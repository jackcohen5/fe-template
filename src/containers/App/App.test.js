import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'

import { BrowserRouter as Router } from 'react-router-dom'

import routes from 'routes'

import { UnwrappedApp as App } from '.'

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

    it('Displays a link to private route', () => {
        renderComponent()
        const expectedLabel = `Go to private app`
        const link = screen.getByRole('link', { name: expectedLabel })
        expect(link).toHaveAttribute('href', routes.PROTECTED_HOME)
        expect(link).toHaveTextContent(expectedLabel)
    })
})
