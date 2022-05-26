import { useEffect } from "react"
import { useSigninCheck } from "reactfire"

import { Navigate } from "react-router-dom"

import { Role, useUserRole } from "flux/ducks/auth"
import Route, { routeTitles } from "routes"
import Loader from "components/Loader"

const DEFAULT_TITLE = "FE Template"

type TitledRouteProps = {
    component: React.ComponentType
    path: Route
    requiredRoles?: Role[]
    publicOnly?: boolean
}

const getRouteTitle = (route: Route) =>
    routeTitles[route]
        ? `${DEFAULT_TITLE} - ${routeTitles[route]}`
        : DEFAULT_TITLE

const TitledRoute = ({
    component: Component,
    path,
    requiredRoles = [],
    publicOnly = false,
}: TitledRouteProps) => {
    const { status, data: { signedIn } = {} } = useSigninCheck()
    const { role, isLoading } = useUserRole()

    useEffect(() => {
        document.title = getRouteTitle(path)
    }, [path])

    if (isLoading || status === "loading") {
        return <Loader isStretchy={true} />
    }

    if (requiredRoles.length && (!signedIn || !requiredRoles.includes(role))) {
        return <Navigate to={Route.LOGIN} />
    }

    if (publicOnly && signedIn) {
        return <Navigate to={Route.HOME} />
    }

    return <Component />
}

TitledRoute.defaultProps = { publicOnly: false, requiredRoles: [] }

export default TitledRoute
