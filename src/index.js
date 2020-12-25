import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import LogRocket from 'logrocket'

import { FontFamily } from 'constants/Typography'
import ErrorBoundary from 'components/ErrorBoundary'
import Loader from 'components/Loader'
import { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN } from 'flux/ducks/auth'
import configureStore from 'flux/store'
import routes from 'routes'

if (process.env.NODE_ENV !== 'development') {
    LogRocket.init('your/logrocket/client-key')
}

const store = configureStore()

const App = lazy(() => import('containers/App'))
const ProtectedApp = lazy(() => import('containers/ProtectedApp'))

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
                        <Suspense fallback={<Loader isStretchy={true} />}>
                            <Switch>
                                <Route
                                    exact
                                    path={routes.HOME}
                                    component={App}
                                />
                                <Route
                                    exact
                                    path={routes.PROTECTED_HOME}
                                    component={ProtectedApp}
                                />
                            </Switch>
                        </Suspense>
                    </Router>
                </Provider>
            </Auth0Provider>
        </ErrorBoundary>
    </div>,
    document.getElementById('root'),
)
