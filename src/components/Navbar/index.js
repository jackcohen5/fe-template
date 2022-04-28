import { memo } from "react"
import PropTypes from "prop-types"
import { Link as RouterLink, useRouteMatch } from "react-router-dom"
import { useSigninCheck, useFirestoreDocData, useFirestore } from "reactfire"
import { doc } from "firebase/firestore"

import routes from "routes"
import Button from "components/Button"
import Link from "components/Link"
import { useLogout, USER_COLLECTION } from "flux/ducks/auth"

import { ButtonWrapper, Container, AvatarImg, Name } from "./Navbar.styles"

const LoggedInNavbarAction = ({ userId }) => {
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

LoggedInNavbarAction.propTypes = {
    userId: PropTypes.string.isRequired,
}

const useNavActions = ({ signedIn, user }) => {
    const { path } = useRouteMatch()

    if (signedIn && user) {
        return <LoggedInNavbarAction userId={user.uid} />
    } else {
        return path === routes.LOGIN ? null : (
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
