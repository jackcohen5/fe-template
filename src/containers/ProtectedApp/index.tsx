import { useUser } from "reactfire"

import App from "containers/App"
import Button from "components/Button"
import Loader from "components/Loader"
import { useLogout } from "flux/ducks/auth"

import { AppContainer } from "./ProtectedApp.styles"

const ProtectedApp = () => {
    const logout = useLogout()
    const { status, data: user } = useUser()

    if (status === "loading") {
        return <Loader isStretchy={true} />
    }

    const logoutButton = (
        <Button ariaLabel="Logout" onClick={logout} type="button">
            Logout
        </Button>
    )

    return (
        <>
            {user?.emailVerified ? (
                <>
                    <App />
                    {logoutButton}
                </>
            ) : (
                <AppContainer>
                    <div>Your email has not been verified.</div>
                    <div>Check your inbox for your verification email.</div>
                    {logoutButton}
                </AppContainer>
            )}
        </>
    )
}

export default ProtectedApp
