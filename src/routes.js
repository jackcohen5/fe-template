import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Route, Redirect } from 'react-router-dom'

import { isLoggedInSelector, Roles, roleSelector } from 'flux/ducks/auth'

export const routes = {
    HOME: '/',
    LOGIN: '/login',
    SIGN_UP: '/sign-up',
    ROLE_1_ROUTE: '/private/role-1',
    ROLE_2_ROUTE: '/private/role-2',
}

const DEFAULT_TITLE = 'FE Template'

const routeTitles = {
    [routes.HOME]: 'Home',
    [routes.LOGIN]: 'Login',
    [routes.SIGN_UP]: 'Sign Up',
    [routes.ROLE_1_ROUTE]: 'Private Role 1 Route',
    [routes.ROLE_2_ROUTE]: 'Private Role 2 Route',
}

export const getRouteTitle = (route) =>
    routeTitles[route]
        ? `${DEFAULT_TITLE} - ${routeTitles[route]}`
        : DEFAULT_TITLE

export const TitledRoute = ({
    component,
    path,
    requiredRoles,
    publicOnly,
    ...routeProps
}) => {
    const isLoggedIn = useSelector(isLoggedInSelector)
    const role = useSelector(roleSelector)
    if (
        requiredRoles.length &&
        (!isLoggedIn || !requiredRoles.includes(role))
    ) {
        return <Redirect to={routes.LOGIN} />
    }

    if (publicOnly && isLoggedIn) {
        return <Redirect to={routes.HOME} />
    }

    const Component = component
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
    requiredRoles: PropTypes.arrayOf(PropTypes.oneOfType(Roles)),
}

TitledRoute.defaultProps = { publicOnly: false, requiredRoles: [] }

export default routes
