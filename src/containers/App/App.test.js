import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'

import routes from 'routes'

import { UnwrappedApp as App } from '.'

const defaultProps = {
    exampleAction: () => {},
    hasTriggeredExample: false,
    isLoggedIn: false,
}

const renderComponent = (props = {}) =>
    render(<App {...defaultProps} {...props} />)

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

    it.each`
        isLoggedIn | label        | route
        ${false}   | ${'private'} | ${routes.PROTECTED_HOME}
        ${true}    | ${'public'}  | ${routes.HOME}
    `(
        'returns link to $route when isLoggedIn is $isLoggedIn',
        ({ isLoggedIn, label, route }) => {
            renderComponent({ isLoggedIn })
            const expectedLabel = `Go to ${label} app`
            const link = screen.getByRole('link', { name: expectedLabel })
            expect(link).toHaveAttribute('href', route)
            expect(link).toHaveTextContent(expectedLabel)
        },
    )
})
