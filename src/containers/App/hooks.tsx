import { useMemo } from "react"
import { useLocation } from "react-router-dom"

import Loader from "components/Loader"
import { Role } from "flux/ducks/auth"
import Route from "routes"

export const useLinkParams = (role = Role.ROLE_1) => {
    const { pathname } = useLocation()
    if (pathname !== Route.HOME) {
        return {
            to: Route.HOME,
            label: "Go to public app",
        }
    }
    return role === Role.ROLE_1
        ? {
              to: Route.ROLE_1_ROUTE,
              label: "Go to role 1 app",
          }
        : {
              to: Route.ROLE_2_ROUTE,
              label: "Go to role 2 app",
          }
}

export const useExampleAction = ({
    exampleAction,
    hasTriggeredExample,
}: {
    exampleAction: () => void
    hasTriggeredExample: boolean
}) => {
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
}: {
    apiExampleAction: () => void
    exampleApiIsLoading: boolean
    exampleApiResult: string
    hasTriggeredExampleApi: boolean
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
