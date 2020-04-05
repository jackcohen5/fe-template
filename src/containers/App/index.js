import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Button from 'src/components/Button'
import Navbar from 'src/components/Navbar'
import routes from 'src/routes'

import {
    exampleAction,
    hasTriggeredExampleSelector,
} from 'src/flux/ducks/example'

import { AppContainer } from './App.styles'

export const UnwrappedApp = ({ hasTriggeredExample, exampleAction }) => (
    <>
        <Navbar title="nametbd" />
        <AppContainer>
            Congrats, you started up nametbd.
            <br />
            Example has {!hasTriggeredExample && 'NOT '}been triggered.
            <br />
            <Button onClick={() => exampleAction()} type="button">
                Trigger Example Action
            </Button>
            <br />
            <Link to={routes.PROTECTED_HOME}>Go to private App</Link>
        </AppContainer>
    </>
)

UnwrappedApp.propTypes = {
    exampleAction: PropTypes.func.isRequired,
    hasTriggeredExample: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    hasTriggeredExample: hasTriggeredExampleSelector(state),
})

const mapDispatchToProps = {
    exampleAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(UnwrappedApp)
