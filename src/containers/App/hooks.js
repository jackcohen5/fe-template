import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Loader from 'components/Loader'
import {
    apiExampleAction,
    exampleApiIsLoadingSelector,
    exampleApiResultSelector,
    hasTriggeredExampleApiSelector,
} from 'flux/ducks/apiExample'
import { exampleAction, hasTriggeredExampleSelector } from 'flux/ducks/example'
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

export const useExampleAction = () => {
    const dispatch = useDispatch()
    const onClick = useCallback(() => dispatch(exampleAction()), [
        dispatch,
        exampleAction,
    ])

    const hasTriggeredExample = useSelector(hasTriggeredExampleSelector)
    const description = useMemo(
        () => (
            <div>
                Example has {!hasTriggeredExample && 'NOT '}been triggered.
            </div>
        ),
        [hasTriggeredExample],
    )
    return { description, buttonDisabled: false, onClick }
}

export const useExampleApiAction = () => {
    const dispatch = useDispatch()
    const onClick = useCallback(() => dispatch(apiExampleAction()), [
        dispatch,
        apiExampleAction,
    ])

    const hasTriggeredExampleApi = useSelector(hasTriggeredExampleApiSelector)
    const exampleApiIsLoading = useSelector(exampleApiIsLoadingSelector)
    const exampleApiResult = useSelector(exampleApiResultSelector)
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
    return { description, buttonDisabled: exampleApiIsLoading, onClick }
}
