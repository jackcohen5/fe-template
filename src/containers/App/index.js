import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Button from 'components/Button'
import Navbar from 'components/Navbar'
import routes from 'routes'

import { exampleAction, hasTriggeredExampleSelector } from 'flux/ducks/example'

import { AppContainer } from './App.styles'

export const UnwrappedApp = ({ hasTriggeredExample, exampleAction }) => (
    <>
        <Navbar title="FE Template" />
        <AppContainer>
            Congrats, you started up the FE template.
            <br />
            Example has {!hasTriggeredExample && 'NOT '}been triggered.
            <br />
            <Button
                ariaLabel="Trigger Example"
                onClick={() => exampleAction()}
                type="button"
            >
                Trigger Example Action
            </Button>
            <br />
            <Link aria-label="Go to private app" to={routes.PROTECTED_HOME}>
                Go to private app
            </Link>
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
