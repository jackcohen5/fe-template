import { useMemo } from "react"
import { useLocation } from "react-router-dom"

import Loader from "components/Loader"
import { Roles } from "flux/ducks/auth"
import routes from "routes"

export const useLinkParams = (role = Roles.ROLE_1) => {
    const { pathname } = useLocation()
    if (pathname !== routes.HOME) {
        return {
            to: routes.HOME,
            label: "Go to public app",
        }
    }
    return role === Roles.ROLE_1
        ? {
              to: routes.ROLE_1_ROUTE,
              label: "Go to role 1 app",
          }
        : {
              to: routes.ROLE_2_ROUTE,
              label: "Go to role 2 app",
          }
}

export const useExampleAction = ({ exampleAction, hasTriggeredExample }) => {
    const description = useMemo(
        () => (
            <div>
                Example has {!hasTriggeredExample && "NOT "}been triggered.
            </div>
        ),
        [hasTriggeredExample]
    )
    return { description, buttonDisabled: false, onClick: exampleAction }
}

export const useExampleApiAction = ({
    apiExampleAction,
    exampleApiIsLoading,
    exampleApiResult,
    hasTriggeredExampleApi,
}) => {
    const description = useMemo(
        () =>
            exampleApiIsLoading ? (
                <>
                    <Loader />
                    <div>Calling in 1 second...</div>
                </>
            ) : (
                <>
                    <div>
                        Example API call has {!hasTriggeredExampleApi && "NOT "}
                        been triggered.
                    </div>
                    {hasTriggeredExampleApi ? (
                        <div>{exampleApiResult}</div>
                    ) : null}
                </>
            ),
        [hasTriggeredExampleApi, exampleApiIsLoading, exampleApiResult]
    )
    return {
        description,
        buttonDisabled: exampleApiIsLoading,
        onClick: apiExampleAction,
    }
}
