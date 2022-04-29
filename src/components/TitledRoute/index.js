import { useEffect } from "react"
import PropTypes from "prop-types"
import { useSigninCheck } from "reactfire"

import { Navigate } from "react-router-dom"

import { Roles, useUserRole } from "flux/ducks/auth"
import { routes, routeTitles } from "routes"
import Loader from "components/Loader"

const DEFAULT_TITLE = "FE Template"

const getRouteTitle = (route) =>
    routeTitles[route]
        ? `${DEFAULT_TITLE} - ${routeTitles[route]}`
        : DEFAULT_TITLE

const TitledRoute = ({
    component: Component,
    path,
    requiredRoles,
    publicOnly,
}) => {
    const { status, data: { signedIn } = {} } = useSigninCheck()
    const { role, isLoading } = useUserRole()

    useEffect(() => {
        document.title = getRouteTitle(path)
    }, [path])

    if (isLoading || status === "loading") {
        return <Loader isStretchy={true} />
    }

    if (requiredRoles.length && (!signedIn || !requiredRoles.includes(role))) {
        return <Navigate to={routes.LOGIN} />
    }

    if (publicOnly && signedIn) {
        return <Navigate to={routes.HOME} />
    }

    return <Component />
}

TitledRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    path: PropTypes.string.isRequired,
    publicOnly: PropTypes.bool,
    requiredRoles: PropTypes.arrayOf(PropTypes.oneOf(Object.values(Roles))),
}

TitledRoute.defaultProps = { publicOnly: false, requiredRoles: [] }

export default TitledRoute
