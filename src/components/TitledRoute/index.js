import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useSigninCheck } from "reactfire"

import { Redirect, Route } from "react-router-dom"

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
    ...routeProps
}) => {
    const { status, data: { signedIn } = {} } = useSigninCheck()
    const { role, isLoading } = useUserRole()

    if (isLoading || status === "loading") {
        return <Loader isStretchy={true} />
    }

    if (requiredRoles.length && (!signedIn || !requiredRoles.includes(role))) {
        return <Redirect to={routes.LOGIN} />
    }

    if (publicOnly && signedIn) {
        return <Redirect to={routes.HOME} />
    }

    return (
        <Route
            path={path}
            {...routeProps}
            render={() => (
                <>
                    <Component />
                    <Helmet>
                        <title>{getRouteTitle(path)}</title>
                    </Helmet>
                </>
            )}
        />
    )
}

TitledRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    path: PropTypes.string.isRequired,
    publicOnly: PropTypes.bool,
    requiredRoles: PropTypes.arrayOf(PropTypes.oneOf(Object.values(Roles))),
}

TitledRoute.defaultProps = { publicOnly: false, requiredRoles: [] }

export default TitledRoute
