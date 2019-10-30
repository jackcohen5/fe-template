import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Navbar from 'src/components/Navbar'

import {
    exampleAction,
    hasTriggeredExampleSelector,
} from 'src/flux/ducks/example'
import { AppContainer } from './App.styles'

const App = ({ hasTriggeredExample, exampleAction }) => (
    <>
        <Navbar title="nametbd" />
        <AppContainer>
            Congrats, you started up nametbd.
            <br />
            Example has {!hasTriggeredExample && 'NOT'} been triggered.
            <br />
            <button onClick={() => exampleAction()} type="button">
                Trigger Example Action
            </button>
        </AppContainer>
    </>
)

App.propTypes = {
    exampleAction: PropTypes.func.isRequired,
    hasTriggeredExample: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    hasTriggeredExample: hasTriggeredExampleSelector(state),
})

const mapDispatchToProps = {
    exampleAction,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)
