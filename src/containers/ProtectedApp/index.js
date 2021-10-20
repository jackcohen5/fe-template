import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'

import App from 'containers/App'
import { isEmailVerifiedSelector } from 'flux/ducks/auth'
import Button from 'components/Button'

import { AppContainer } from './ProtectedApp.styles'

export const UnwrappedProtectedApp = ({ isEmailVerified }) => {
    const firebase = useFirebase()
    const logout = () => firebase.logout()

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
            {isEmailVerified ? (
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
    isEmailVerified: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    isEmailVerified: isEmailVerifiedSelector(state),
})

export default connect(mapStateToProps)(UnwrappedProtectedApp)
