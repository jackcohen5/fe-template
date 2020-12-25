import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Link from 'components/Link'
import Navbar from 'components/Navbar'
import {
    apiExampleAction,
    exampleApiIsLoadingSelector,
    exampleApiResultSelector,
    hasTriggeredExampleApiSelector,
} from 'flux/ducks/apiExample'
import { exampleAction, hasTriggeredExampleSelector } from 'flux/ducks/example'

import { AppContainer } from './App.styles'
import ExampleAction from './ExampleAction'
import { useExampleAction, useExampleApiAction, useLinkParams } from './hooks'

export const UnwrappedApp = ({
    apiExampleAction,
    exampleAction,
    exampleApiIsLoading,
    exampleApiResult,
    hasTriggeredExample,
    hasTriggeredExampleApi,
}) => {
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
            <Navbar title="FE Template" />
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

UnwrappedApp.propTypes = {
    apiExampleAction: PropTypes.func.isRequired,
    exampleAction: PropTypes.func.isRequired,
    exampleApiIsLoading: PropTypes.bool.isRequired,
    exampleApiResult: PropTypes.string.isRequired,
    hasTriggeredExample: PropTypes.bool.isRequired,
    hasTriggeredExampleApi: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
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
