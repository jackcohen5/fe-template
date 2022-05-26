import { render, screen } from "@testing-library/react"
import UserEvent from "@testing-library/user-event"
import { useUser } from "reactfire"

import { useLogout } from "flux/ducks/auth"

import ProtectedApp from "."

jest.mock("flux/ducks/auth")
jest.mock("containers/App", () => {
    return {
        __esModule: true,
        default: () => {
            return <div>App Container</div>
        },
    }
})

const mockedUseLogout = useLogout as jest.Mock
const mockedUseUser = useUser as jest.Mock

const renderComponent = (props = {}) => render(<ProtectedApp {...props} />)

describe("ProtectedApp", () => {
    beforeEach(() => {
        jest.resetAllMocks()

        mockedUseUser.mockReturnValue({
            status: "success",
            data: { emailVerified: true },
        })
    })

    it("Renders app container if verified", () => {
        mockedUseUser.mockReturnValue({
            status: "success",
            data: { emailVerified: true },
        })

        renderComponent()
        expect(screen.getByText("App Container")).toBeDefined()
    })

    it("Renders loader if user is loading", () => {
        mockedUseUser.mockReturnValue({ status: "loading", data: null })

        renderComponent()
        expect(screen.findByLabelText("loader")).toBeDefined()
    })

    it("Renders verification prompt if unverified", () => {
        mockedUseUser.mockReturnValue({
            status: "success",
            data: { emailVerified: false },
        })

        renderComponent()
        expect(
            screen.getByText("Check your inbox for your verification email.")
        ).toBeDefined()
    })

    it("Triggers logout on button click", async () => {
        const mockLogout = jest.fn()
        mockedUseLogout.mockImplementation(mockLogout)

        renderComponent()
        await UserEvent.click(screen.getByRole("button", { name: "Logout" }))
        expect(mockLogout).toHaveBeenCalled()
    })
})
