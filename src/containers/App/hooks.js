import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import Loader from 'components/Loader'
import routes from 'routes'

export const useLinkParams = () => {
    const { pathname } = useLocation()
    return pathname === routes.HOME
        ? {
              to: routes.PROTECTED_HOME,
              label: 'Go to private app',
          }
        : {
              to: routes.HOME,
              label: 'Go to public app',
          }
}

export const useExampleAction = ({ exampleAction, hasTriggeredExample }) => {
    const description = useMemo(
        () => (
            <div>
                Example has {!hasTriggeredExample && 'NOT '}been triggered.
            </div>
        ),
        [hasTriggeredExample],
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
                        Example API call has {!hasTriggeredExampleApi && 'NOT '}
                        been triggered.
                    </div>
                    {hasTriggeredExampleApi ? (
                        <div>{exampleApiResult}</div>
                    ) : null}
                </>
            ),
        [hasTriggeredExampleApi, exampleApiIsLoading, exampleApiResult],
    )
    return {
        description,
        buttonDisabled: exampleApiIsLoading,
        onClick: apiExampleAction,
    }
}
