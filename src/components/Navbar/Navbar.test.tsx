import { render, screen } from "@testing-library/react"
import UserEvent from "@testing-library/user-event"
import { useLocation } from "react-router-dom"
import { useFirestore, useFirestoreDocData, useSigninCheck } from "reactfire"
import { BrowserRouter as Router } from "react-router-dom"

import { useLogout } from "flux/ducks/auth"
import routes from "routes"

import Navbar from "."

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: jest.fn(),
}))
jest.mock("flux/ducks/auth")

const mockedUseFirestore = useFirestore as jest.Mock
const mockedUseFirestoreDocData = useFirestoreDocData as jest.Mock
const mockedUseLocation = useLocation as jest.Mock
const mockedUseLogout = useLogout as jest.Mock
const mockedUseSigninCheck = useSigninCheck as jest.Mock

const renderComponent = () =>
    render(
        <Router>
            <Navbar />
        </Router>
    )

const mockUid = "some-user-uuid"

describe("Navbar", () => {
    beforeEach(() => {
        jest.resetAllMocks()

        mockedUseFirestore.mockReturnValue(null)
        mockedUseLocation.mockReturnValue({
            pathname: routes.HOME,
        })
        mockedUseSigninCheck.mockReturnValue({
            status: "success",
            data: { signedIn: true, user: { uid: mockUid } },
        })
        mockedUseFirestoreDocData.mockReturnValue({
            status: "success",
            data: { firstName: "Obi Wan", lastName: "Kenobi" },
        })
    })

    it("Does not render nav actions if sign in check loading", () => {
        mockedUseSigninCheck.mockReturnValue({ status: "loading" })

        renderComponent()
        expect(screen.queryByTestId("nav-actions-wrapper")).toBeNull()
    })

    it("Renders avatar, name and logout button if signed in", async () => {
        const mockLogout = jest.fn()
        mockedUseLogout.mockReturnValue(mockLogout)

        renderComponent()
        expect(screen.queryByTestId("nav-actions-wrapper")).not.toBeNull()
        expect(screen.queryByAltText("Avatar")).not.toBeNull()
        expect(screen.queryByLabelText("Logout")).not.toBeNull()
        expect(screen.queryByText("Obi Wan Kenobi")).not.toBeNull()
        await UserEvent.click(screen.getByRole("button", { name: "Logout" }))
        expect(mockLogout).toHaveBeenCalled()
    })

    it("Renders login button if not signed in", () => {
        mockedUseSigninCheck.mockReturnValue({
            status: "success",
            data: { signedIn: false, user: null },
        })
        renderComponent()
        expect(screen.queryByTestId("nav-actions-wrapper")).not.toBeNull()
        expect(screen.queryByLabelText("Login")).not.toBeNull()
    })

    it("Does not render login button if on login page", () => {
        mockedUseLocation.mockReturnValue({
            pathname: routes.LOGIN,
        })
        mockedUseSigninCheck.mockReturnValue({
            status: "success",
            data: { signedIn: false, user: null },
        })
        renderComponent()
        expect(screen.queryByTestId("nav-actions-wrapper")).not.toBeNull()
        expect(screen.queryByLabelText("Login")).toBeNull()
    })
})
