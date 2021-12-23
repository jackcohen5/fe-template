import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import LogRocket from 'logrocket'
import {
    FirebaseAppProvider,
    AuthProvider,
    useFirebaseApp,
    FirestoreProvider,
} from 'reactfire'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import { FontFamily } from 'constants/Typography'
import ErrorBoundary from 'components/ErrorBoundary'
import Loader from 'components/Loader'
import configureStore from 'flux/store'
import routes, { TitledRoute } from 'routes'
import { Roles } from 'flux/ducks/auth'

if (process.env.NODE_ENV !== 'development') {
    LogRocket.init(process.env.LOGROCKET_CLIENT_KEY)
}

const store = configureStore()

const App = lazy(() => import('containers/App'))
const ProtectedApp = lazy(() => import('containers/ProtectedApp'))
const Login = lazy(() => import('containers/Login'))
const SignUp = lazy(() => import('containers/SignUp'))

const WrappedFirebaseProvider = ({ children }) => {
    const Firebase = useFirebaseApp()
    return (
        <AuthProvider sdk={getAuth(Firebase)}>
            <FirestoreProvider sdk={getFirestore(Firebase)}>
                {children}
            </FirestoreProvider>
        </AuthProvider>
    )
}

WrappedFirebaseProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

ReactDOM.render(
    <div id="app" style={{ fontFamily: FontFamily }}>
        <ErrorBoundary tag="root">
            <FirebaseAppProvider
                firebaseConfig={{
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    apiKey: process.env.FIREBASE_API_KEY,
                }}
            >
                <WrappedFirebaseProvider>
                    <Provider store={store}>
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
                    </Provider>
                </WrappedFirebaseProvider>
            </FirebaseAppProvider>
        </ErrorBoundary>
    </div>,
    document.getElementById('root'),
)
