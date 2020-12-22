import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'

import App from 'pages'
import { handleLogin, isVerifiedSelector, userSelector } from 'flux/ducks/auth'
import Button from 'components/Button'
import routes from 'routes'

import { AppContainer } from './ProtectedApp.styles'

const useHandleLogin = () => {
    const { isAuthenticated, user, getAccessTokenSilently, logout } = useAuth0()
    const currentUser = useSelector(userSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isAuthenticated && !currentUser) {
            dispatch(
                handleLogin({
                    user: {
                        email: user.email,
                        firstName: user.given_name,
                        lastName: user.family_name,
                        name: user.name,
                        isVerified: user.email_verified,
                        picture: user.picture,
                        sub: user.sub,
                    },
                    getAccessToken: getAccessTokenSilently,
                }),
            )
        }
    }, [
        isAuthenticated,
        getAccessTokenSilently,
        currentUser,
        dispatch,
        user.email,
        user.given_name,
        user.family_name,
        user.name,
        user.email_verified,
        user.picture,
        user.sub,
    ])

    return { logout }
}

export const UnwrappedProtectedApp = ({ isVerified }) => {
    const { logout } = useHandleLogin()
    const logoutButton = (
        <Button
            onClick={() => logout({ returnTo: window.location.origin })}
            type="button"
        >
            Logout
        </Button>
    )

    return (
        <AppContainer>
            <Link href={routes.HOME}>Go to public App</Link>
            {isVerified ? (
                <>
                    <App isLoggedIn={true} />
                    {logoutButton}
                </>
            ) : (
                <>
                    <div>Your email has not been verified.</div>
                    <div>Check your inbox for your verification email.</div>
                    {logoutButton}
                </>
            )}
        </AppContainer>
    )
}

UnwrappedProtectedApp.propTypes = {
    isVerified: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isVerified: isVerifiedSelector(state),
})

export default withAuthenticationRequired(
    connect(mapStateToProps)(UnwrappedProtectedApp),
    {
        returnTo: routes.PRIVATE,
        onRedirecting: () => (
            <AppContainer>Redirecting you to the login screen...</AppContainer>
        ),
    },
)
