import { useSelector } from 'react-redux'
import { Link as RouterLink, useRouteMatch } from 'react-router-dom'
import { useFirebase } from 'react-redux-firebase'

import routes from 'routes'
import Button from 'components/Button'
import {
    isAuthLoadedSelector,
    isLoggedInSelector,
} from 'flux/ducks/auth/selectors'
import { fullNameSelector } from 'flux/ducks/profile/selectors'

import { ButtonWrapper, Container, AvatarImg } from './Navbar.styles'

const useNavbarAuth = () => {
    const isLoggedIn = useSelector(isLoggedInSelector)
    const fullName = useSelector(fullNameSelector)
    const firebase = useFirebase()
    const logout = () => firebase.logout()

    return { isLoggedIn, fullName, logout }
}

const useNavActions = () => {
    const { isLoggedIn, fullName, logout } = useNavbarAuth()
    const { path } = useRouteMatch()

    if (isLoggedIn) {
        return fullName ? (
            <>
                <AvatarImg src="/default-avatar.png" alt="Avatar" />
                <Button onClick={logout} ariaLabel="Login">
                    Logout
                </Button>
            </>
        ) : null
    } else {
        return path === routes.LOGIN ? null : (
            <>
                <RouterLink to={routes.LOGIN}>
                    <Button ariaLabel="Login">Login</Button>
                </RouterLink>
            </>
        )
    }
}

export const Navbar = () => {
    const isAuthLoaded = useSelector(isAuthLoadedSelector)
    const navActions = useNavActions()
    return (
        <Container>
            <RouterLink to={routes.HOME}>FE Template</RouterLink>
            {isAuthLoaded ? <ButtonWrapper>{navActions}</ButtonWrapper> : null}
        </Container>
    )
}

export { NavbarHeight } from './Navbar.constants'
export default Navbar
