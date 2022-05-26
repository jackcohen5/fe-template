import "core-js/stable"
import "regenerator-runtime/runtime"

import { Suspense, lazy } from "react"
import { createRoot } from "react-dom/client"
import {
    Navigate,
    BrowserRouter as Router,
    Route as RouterRoute,
    Routes,
} from "react-router-dom"
import { init as LogrocketInit } from "logrocket"

import ErrorBoundary from "components/ErrorBoundary"
import GlobalProviders from "components/GlobalProviders"
import Loader from "components/Loader"
import TitledRoute from "components/TitledRoute"
import { FontFamily } from "constants/Typography"
import { Role } from "flux/ducks/auth"
import Route from "routes"

if (process.env.NODE_ENV !== "development") {
    LogrocketInit(process.env.LOGROCKET_CLIENT_KEY)
}

const App = lazy(() => import("containers/App"))
const ProtectedApp = lazy(() => import("containers/ProtectedApp"))
const Login = lazy(() => import("containers/Login"))
const SignUp = lazy(() => import("containers/SignUp"))

const TitledRoutes = [
    { path: Route.HOME, component: App },
    { path: Route.LOGIN, component: Login, publicOnly: true },
    { path: Route.SIGN_UP, component: SignUp, publicOnly: true },
    {
        path: Route.ROLE_1_ROUTE,
        component: ProtectedApp,
        requiredRoles: [Role.ROLE_1],
    },
    {
        path: Route.ROLE_2_ROUTE,
        component: ProtectedApp,
        requiredRoles: [Role.ROLE_2],
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
                                <RouterRoute
                                    key={tr.path}
                                    path={tr.path}
                                    element={<TitledRoute {...tr} />}
                                />
                            ))}
                            <RouterRoute
                                element={<Navigate to={Route.HOME} />}
                            />
                        </Routes>
                    </Suspense>
                </Router>
            </GlobalProviders>
        </ErrorBoundary>
    </div>
)
