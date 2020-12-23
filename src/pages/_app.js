import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'
import LogRocket from 'logrocket'

import { FontFamily } from 'constants/Typography'
import configureStore from 'flux/store'
import ErrorBoundary from 'components/ErrorBoundary'
import routes from 'routes'
import { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN } from 'flux/ducks/auth'

if (process.env.NODE_ENV !== 'development') {
    LogRocket.init('your/logrocket/client-key')
}

const store = configureStore()

const BootstrappedApp = ({ Component, pageProps }) => {
    let origin
    try {
        origin = window?.location?.origin
    } catch (e) {
        origin = 'http://localhost:3000'
    }

    return (
        <div style={{ fontFamily: FontFamily }}>
            <ErrorBoundary tag="root">
                <Auth0Provider
                    audience={AUTH0_AUDIENCE}
                    domain={AUTH0_DOMAIN}
                    clientId={AUTH0_CLIENT_ID}
                    useRefreshTokens={true}
                    redirectUri={`${origin}${routes.PROTECTED_HOME}`}
                >
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </Auth0Provider>
            </ErrorBoundary>
        </div>
    )
}

BootstrappedApp.propTypes = {
    Component: PropTypes.any.isRequired,
    pageProps: PropTypes.object.isRequired,
}

export default BootstrappedApp
