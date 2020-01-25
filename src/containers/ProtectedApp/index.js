import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import App from 'src/containers/App'
import Button from 'src/components/Button'
import Loader from 'src/components/Icons/Loader'
import {
    isCheckingLoginSelector,
    isLoggedInSelector,
    isVerifiedSelector,
    login,
    logout,
    signUp,
    Roles,
} from 'src/flux/ducks/auth'
import routes from 'src/routes'

import {
    WelcomeMessage,
    LoginButtonContainer,
    AppContainer,
} from './ProtectedApp.styles'

export const UnwrappedProtectedApp = ({
    isCheckingLogin,
    isLoggedIn,
    isVerified,
    login,
    logout,
    signUp,
}) => {
    let content
    if (isCheckingLogin) {
        content = <Loader />
    } else if (isLoggedIn && isVerified) {
        content = <App />
    } else if (isLoggedIn && !isVerified) {
        content = (
            <>
                <div>Your email has not been verified.</div>
                <div>Check your inbox for your verification email.</div>
                <Button onClick={() => logout()} type="button">
                    Logout
                </Button>
            </>
        )
    } else {
        content = (
            <>
                <WelcomeMessage>
                    Welcome to nametbd. Please Login.
                </WelcomeMessage>
                <LoginButtonContainer>
                    <Button onClick={() => login()} type="button">
                        Login
                    </Button>
                    <Button
                        onClick={() => signUp(Roles.nametbd_ROLE1)}
                        type="button"
                    >
                        Sign Up as nametbd_ROLE1
                    </Button>
                    <Button
                        onClick={() => signUp(Roles.nametbd_ROLE2)}
                        type="button"
                    >
                        Sign Up as nametbd_ROLE2
                    </Button>
                </LoginButtonContainer>
            </>
        )
    }
    return (
        <AppContainer>
            <Link to={routes.HOME}>Go to public App</Link>
            {content}
        </AppContainer>
    )
}

UnwrappedProtectedApp.propTypes = {
    isCheckingLogin: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isVerified: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isCheckingLogin: isCheckingLoginSelector(state),
    isLoggedIn: isLoggedInSelector(state),
    isVerified: isVerifiedSelector(state),
})

const mapDispatchToProps = {
    login,
    logout,
    signUp,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UnwrappedProtectedApp)
