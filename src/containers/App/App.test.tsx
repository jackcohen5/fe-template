import { render, screen } from "@testing-library/react"
import UserEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { BrowserRouter as Router, useLocation } from "react-router-dom"

import configureStore from "flux/store"
import Route from "routes"

import { UnwrappedApp as App } from "."

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: jest.fn(),
}))
jest.mock("components/Navbar", () => {
    return {
        __esModule: true,
        default: () => {
            return <nav>Navbar</nav>
        },
    }
})

const mockedUseLocation = useLocation as jest.Mock

const noop: () => void = () => undefined

const defaultProps = {
    apiExampleAction: noop,
    exampleAction: noop,
    exampleApiIsLoading: false,
    hasTriggeredExample: false,
    hasTriggeredExampleApi: false,
    exampleApiResult: "",
}

const store = configureStore()

const renderComponent = (props = {}) =>
    render(
        <Provider store={store}>
            <Router>
                <App {...defaultProps} {...props} />
            </Router>
        </Provider>
    )

describe("App", () => {
    beforeEach(() => {
        jest.resetAllMocks()
        mockedUseLocation.mockReturnValue({
            pathname: Route.HOME,
        })
    })

    describe("Example action", () => {
        it("Displays correct description when untriggered", () => {
            renderComponent({ hasTriggeredExample: false })
            expect(
                screen.getByText("Example has NOT been triggered", {
                    exact: false,
                })
            ).toBeDefined()
        })

        it("Displays correct description when triggered", () => {
            renderComponent({ hasTriggeredExample: true })

            expect(
                screen.getByText("Example has been triggered", {
                    exact: false,
                })
            ).toBeDefined()
        })

        it("Calls exampleAction on button click", async () => {
            const exampleActionSpy = jest.fn()
            renderComponent({ exampleAction: exampleActionSpy })
            await UserEvent.click(
                screen.getByRole("button", { name: "Trigger Example Action" })
            )
            expect(exampleActionSpy).toHaveBeenCalled()
        })
    })

    describe("Example API action", () => {
        it("Displays correct description when untriggered", () => {
            renderComponent({ hasTriggeredExampleApi: false })
            expect(
                screen.getByText("Example API call has NOT been triggered", {
                    exact: false,
                })
            ).toBeDefined()
        })

        it("Displays correct description when triggered", () => {
            renderComponent({ hasTriggeredExampleApi: true })
            expect(
                screen.getByText("Example API call has been triggered", {
                    exact: false,
                })
            ).toBeDefined()
        })

        it("Displays loading message when loading", () => {
            renderComponent({
                hasTriggeredExampleApi: true,
                exampleApiIsLoading: true,
            })
            expect(screen.getByText("Calling in 1 second...")).toBeDefined()
        })

        it("Calls apiExampleAction on button click", async () => {
            const apiExampleActionSpy = jest.fn()
            renderComponent({ apiExampleAction: apiExampleActionSpy })
            await UserEvent.click(
                screen.getByRole("button", { name: "Trigger API Call" })
            )
            expect(apiExampleActionSpy).toHaveBeenCalled()
        })
    })

    it.each`
        currentRoute          | label       | expectedRoute
        ${Route.HOME}         | ${"role 1"} | ${Route.ROLE_1_ROUTE}
        ${Route.ROLE_1_ROUTE} | ${"public"} | ${Route.HOME}
        ${Route.ROLE_2_ROUTE} | ${"public"} | ${Route.HOME}
    `(
        "Displays a link to $expectedRoute when current route is $currentRoute",
        ({ currentRoute, label, expectedRoute }) => {
            mockedUseLocation.mockReturnValue({
                pathname: currentRoute,
            })
            renderComponent()
            const expectedLabel = `Go to ${label} app`
            const link = screen.getByRole("link", { name: expectedLabel })
            expect(link).toHaveAttribute("href", expectedRoute)
            expect(link).toHaveTextContent(expectedLabel)
        }
    )
})
