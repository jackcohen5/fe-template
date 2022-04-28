import "core-js/stable"
import "regenerator-runtime/runtime"

import { lazy, Suspense } from "react"
import { createRoot } from "react-dom/client"
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom"
import LogRocket from "logrocket"

import ErrorBoundary from "components/ErrorBoundary"
import GlobalProviders from "components/GlobalProviders"
import Loader from "components/Loader"
import TitledRoute from "components/TitledRoute"
import { FontFamily } from "constants/Typography"
import { Roles } from "flux/ducks/auth"
import routes from "routes"

if (process.env.NODE_ENV !== "development") {
    LogRocket.init(process.env.LOGROCKET_CLIENT_KEY)
}

const App = lazy(() => import("containers/App"))
const ProtectedApp = lazy(() => import("containers/ProtectedApp"))
const Login = lazy(() => import("containers/Login"))
const SignUp = lazy(() => import("containers/SignUp"))

const TitledRoutes = [
    { path: routes.HOME, component: App },
    { path: routes.LOGIN, component: Login, publicOnly: true },
    { path: routes.SIGN_UP, component: SignUp, publicOnly: true },
    {
        path: routes.ROLE_1_ROUTE,
        component: ProtectedApp,
        requiredRoles: [Roles.ROLE_1],
    },
    {
        path: routes.ROLE_2_ROUTE,
        component: ProtectedApp,
        requiredRoles: [Roles.ROLE_2],
    },
]

createRoot(document.getElementById("root")).render(
    <div id="app" style={{ fontFamily: FontFamily }}>
        <ErrorBoundary tag="root">
            <GlobalProviders>
                <Router>
                    <Suspense fallback={<Loader isStretchy={true} />}>
                        <Routes>
                            {TitledRoutes.map((tr) => (
                                <Route
                                    key={tr.path}
                                    path={tr.path}
                                    exact
                                    element={<TitledRoute {...tr} />}
                                />
                            ))}
                            <Route
                                render={() => <Navigate to={routes.HOME} />}
                            />
                        </Routes>
                    </Suspense>
                </Router>
            </GlobalProviders>
        </ErrorBoundary>
    </div>
)
