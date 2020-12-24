import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import App from 'containers/App'
import { isVerifiedSelector } from 'flux/ducks/auth'
import Button from 'components/Button'
import routes from 'routes'

import { useHandleLogin } from './hooks'

import { AppContainer } from './ProtectedApp.styles'

export const UnwrappedProtectedApp = ({ isVerified }) => {
    const { logout } = useHandleLogin()
    const logoutButton = (
        <Button
            ariaLabel="Logout"
            onClick={() => logout({ returnTo: window.location.origin })}
            type="button"
        >
            Logout
        </Button>
    )

    return (
        <AppContainer>
            {isVerified ? (
                <>
                    <App />
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

const mapStateToProps = (state) => ({
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
