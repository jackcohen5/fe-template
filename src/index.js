import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Provider, useSelector } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import LogRocket from 'logrocket'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'

import { FontFamily } from 'constants/Typography'
import ErrorBoundary from 'components/ErrorBoundary'
import Loader from 'components/Loader'
import configureStore from 'flux/store'
import routes, { TitledRoute } from 'routes'
import {
    Roles,
    isLoggedInSelector,
    isAuthLoadedSelector,
} from 'flux/ducks/auth'
import { profileIsLoadedSelector } from 'flux/ducks/profile'

if (process.env.NODE_ENV !== 'development') {
    LogRocket.init(process.env.LOGROCKET_CLIENT_KEY)
}

firebase.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID,
    apiKey: process.env.FIREBASE_API_KEY,
})
firebase.firestore()

const store = configureStore()

const App = lazy(() => import('containers/App'))
const ProtectedApp = lazy(() => import('containers/ProtectedApp'))
const Login = lazy(() => import('containers/Login'))
const SignUp = lazy(() => import('containers/SignUp'))

const AuthAndRoleIsLoaded = ({ children }) => {
    const isAuthLoaded = useSelector(isAuthLoadedSelector)
    const isLoggedIn = useSelector(isLoggedInSelector)
    const profileIsLoaded = useSelector(profileIsLoadedSelector)
    if (!isAuthLoaded || (isLoggedIn && !profileIsLoaded))
        return <Loader isStretchy={true} />
    return children
}

AuthAndRoleIsLoaded.propTypes = {
    children: PropTypes.node.isRequired,
}

ReactDOM.render(
    <div id="app" style={{ fontFamily: FontFamily }}>
        <ErrorBoundary tag="root">
            <ReactReduxFirebaseProvider
                firebase={firebase}
                config={{
                    userProfile: 'users',
                    updateProfileOnLogin: false,
                    useFirestoreForProfile: true,
                    enableClaims: true,
                }}
                dispatch={store.dispatch}
                createFirestoreInstance={createFirestoreInstance}
            >
                <Provider store={store}>
                    <Router>
                        <AuthAndRoleIsLoaded>
                            <Suspense fallback={<Loader isStretchy={true} />}>
                                <Switch>
                                    <Route
                                        exact
                                        path={routes.HOME}
                                        component={App}
                                    />
                                    <Route
                                        exact
                                        path={routes.LOGIN}
                                        component={Login}
                                    />
                                    <Route
                                        exact
                                        path={routes.SIGN_UP}
                                        component={SignUp}
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
                        </AuthAndRoleIsLoaded>
                    </Router>
                </Provider>
            </ReactReduxFirebaseProvider>
        </ErrorBoundary>
    </div>,
    document.getElementById('root'),
)
