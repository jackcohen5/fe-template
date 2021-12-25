import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import LogRocket from 'logrocket'

import ErrorBoundary from 'components/ErrorBoundary'
import Loader from 'components/Loader'
import TitledRoute from 'components/TitledRoute'
import { FontFamily } from 'constants/Typography'
import { Roles } from 'flux/ducks/auth'
import routes from 'routes'

import GlobalProviders from './GlobalProviders'

if (process.env.NODE_ENV !== 'development') {
    LogRocket.init(process.env.LOGROCKET_CLIENT_KEY)
}

const App = lazy(() => import('containers/App'))
const ProtectedApp = lazy(() => import('containers/ProtectedApp'))
const Login = lazy(() => import('containers/Login'))
const SignUp = lazy(() => import('containers/SignUp'))

ReactDOM.render(
    <div id="app" style={{ fontFamily: FontFamily }}>
        <ErrorBoundary tag="root">
            <GlobalProviders>
                <Router>
                    <Suspense fallback={<Loader isStretchy={true} />}>
                        <Switch>
                            <TitledRoute
                                exact
                                path={routes.HOME}
                                component={App}
                            />
                            <TitledRoute
                                exact
                                path={routes.LOGIN}
                                component={Login}
                                publicOnly
                            />
                            <TitledRoute
                                exact
                                path={routes.SIGN_UP}
                                component={SignUp}
                                publicOnly
                            />
                            <TitledRoute
                                exact
                                path={routes.ROLE_1_ROUTE}
                                component={ProtectedApp}
                                requiredRoles={[Roles.ROLE_1]}
                            />
                            <TitledRoute
                                exact
                                path={routes.ROLE_2_ROUTE}
                                component={ProtectedApp}
                                requiredRoles={[Roles.ROLE_2]}
                            />
                            <Redirect to={routes.HOME} />
                        </Switch>
                    </Suspense>
                </Router>
            </GlobalProviders>
        </ErrorBoundary>
    </div>,
    document.getElementById('root'),
)
