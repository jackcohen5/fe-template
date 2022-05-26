import { memo } from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { useFirestore, useFirestoreDocData, useSigninCheck } from "reactfire"
import { doc } from "firebase/firestore"

import routes from "routes"
import Button from "components/Button"
import Link from "components/Link"
import { USER_COLLECTION, useLogout } from "flux/ducks/auth"

import { AvatarImg, ButtonWrapper, Container, Name } from "./Navbar.styles"

const LoggedInNavbarAction = ({ userId }: { userId: string }) => {
    const logout = useLogout()
    const { status, data: { firstName = null, lastName = null } = {} } =
        useFirestoreDocData(doc(useFirestore(), USER_COLLECTION, userId))

    return (
        <>
            <AvatarImg src="/default-avatar.png" alt="Avatar" />
            {status === "success" ? (
                <Name>
                    {firstName} {lastName}
                </Name>
            ) : null}
            <Button onClick={logout} ariaLabel="Logout">
                Logout
            </Button>
        </>
    )
}

const useNavActions = ({
    signedIn,
    user,
}: {
    signedIn: boolean
    user: { uid: string }
}) => {
    const { pathname } = useLocation()

    if (signedIn && user) {
        return <LoggedInNavbarAction userId={user.uid} />
    } else {
        return pathname === routes.LOGIN ? null : (
            <RouterLink to={routes.LOGIN}>
                <Button ariaLabel="Login">Login</Button>
            </RouterLink>
        )
    }
}

const Navbar = () => {
    const { status, data: { signedIn = false, user = null } = {} } =
        useSigninCheck()
    const navActions = useNavActions({ signedIn, user })

    return (
        <Container>
            <Link to={routes.HOME} label="FE Template" />
            {status === "loading" ? null : (
                <ButtonWrapper data-testid="nav-actions-wrapper">
                    {navActions}
                </ButtonWrapper>
            )}
        </Container>
    )
}

export { NavbarHeight } from "./Navbar.constants"
export default memo(Navbar)
