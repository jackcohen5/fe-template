import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useSigninCheck } from 'reactfire'

import { Redirect, Route } from 'react-router-dom'

import { Roles, useUserRole } from 'flux/ducks/auth'
import Loader from 'components/Loader'

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

const getRouteTitle = (route) =>
    routeTitles[route]
        ? `${DEFAULT_TITLE} - ${routeTitles[route]}`
        : DEFAULT_TITLE

export const TitledRoute = ({
    component: Component,
    path,
    requiredRoles,
    publicOnly,
    ...routeProps
}) => {
    const { status, data: { signedIn } = {} } = useSigninCheck()
    const { role, isLoading } = useUserRole()

    if (isLoading || status === 'loading') {
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

export default routes
