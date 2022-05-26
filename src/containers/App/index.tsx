import { connect } from "react-redux"

import Link from "components/Link"
import Navbar from "components/Navbar"
import {
    apiExampleAction,
    exampleApiIsLoadingSelector,
    exampleApiResultSelector,
    hasTriggeredExampleApiSelector,
} from "flux/ducks/apiExample"
import { exampleAction, hasTriggeredExampleSelector } from "flux/ducks/example"
import { AppState } from "flux/store"

import { AppContainer } from "./App.styles"
import ExampleAction from "./ExampleAction"
import { useExampleAction, useExampleApiAction, useLinkParams } from "./hooks"

type AppProps = {
    apiExampleAction: () => void
    exampleAction: () => void
    exampleApiIsLoading: boolean
    exampleApiResult: string
    hasTriggeredExample: boolean
    hasTriggeredExampleApi: boolean
}

export const UnwrappedApp = ({
    apiExampleAction,
    exampleAction,
    exampleApiIsLoading,
    exampleApiResult,
    hasTriggeredExample,
    hasTriggeredExampleApi,
}: AppProps) => {
    const exampleActionProps = useExampleAction({
        exampleAction,
        hasTriggeredExample,
    })
    const exampleApiActionProps = useExampleApiAction({
        apiExampleAction,
        exampleApiIsLoading,
        exampleApiResult,
        hasTriggeredExampleApi,
    })
    const linkParams = useLinkParams()
    return (
        <>
            <Navbar />
            <AppContainer>
                <div>Congrats, you started up the FE template.</div>
                <ExampleAction
                    buttonLabel="Trigger Example Action"
                    {...exampleActionProps}
                />
                <ExampleAction
                    buttonLabel="Trigger API Call"
                    {...exampleApiActionProps}
                />
                <Link {...linkParams} />
            </AppContainer>
        </>
    )
}

const mapStateToProps = (state: AppState) => ({
    exampleApiIsLoading: exampleApiIsLoadingSelector(state),
    exampleApiResult: exampleApiResultSelector(state),
    hasTriggeredExample: hasTriggeredExampleSelector(state),
    hasTriggeredExampleApi: hasTriggeredExampleApiSelector(state),
})

const mapDispatchToProps = {
    apiExampleAction,
    exampleAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(UnwrappedApp)
