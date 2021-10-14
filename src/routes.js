import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Route, Redirect } from 'react-router-dom'

import { isLoggedInSelector } from 'flux/ducks/auth/selectors'
import { Roles, roleSelector } from 'flux/ducks/auth'

export const routes = {
    HOME: '/',
    ROLE_1_ROUTE: '/private/role_1',
    ROLE_2_ROUTE: '/private/role_2',
}

const DEFAULT_TITLE = 'FE Template'

const routeTitles = {
    [routes.HOME]: 'Home',
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
    ...routeProps
}) => {
    const isAuthorizedRoute = requiredRoles.length
    const isLoggedIn = useSelector(isLoggedInSelector)
    const role = useSelector(roleSelector)
    if (isAuthorizedRoute && (!isLoggedIn || !requiredRoles.includes(role))) {
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
    requiredRoles: PropTypes.arrayOf(PropTypes.oneOfType(Roles)),
}

TitledRoute.defaultProps = { requiredRoles: [] }

export default routes
