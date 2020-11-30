import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import LogRocket from 'logrocket'

import { FontFamily } from 'src/constants/Typography'
import routes from 'src/routes'
import configureStore from 'src/flux/store'
import App from 'src/containers/App'
import ErrorBoundary from 'src/components/ErrorBoundary'
import ProtectedApp from 'src/containers/ProtectedApp'
import {
    AUTH0_AUDIENCE,
    AUTH0_CLIENT_ID,
    AUTH0_DOMAIN,
} from 'src/flux/ducks/auth'

if (process.env.NODE_ENV !== 'development') {
    LogRocket.init('your/logrocket/client-key')
}

const store = configureStore()

ReactDOM.render(
    <div style={{ fontFamily: FontFamily }}>
        <ErrorBoundary tag="root">
            <Auth0Provider
                audience={AUTH0_AUDIENCE}
                domain={AUTH0_DOMAIN}
                clientId={AUTH0_CLIENT_ID}
                useRefreshTokens={true}
                redirectUri={`${window.location.origin}${routes.PROTECTED_HOME}`}
            >
                <Provider store={store}>
                    <Router>
                        <Switch>
                            <Route exact path={routes.HOME} component={App} />
                            <Route
                                exact
                                path={routes.PROTECTED_HOME}
                                component={ProtectedApp}
                            />
                        </Switch>
                    </Router>
                </Provider>
            </Auth0Provider>
        </ErrorBoundary>
    </div>,
    document.getElementById('root'),
)
