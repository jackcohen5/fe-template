import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Link from 'next/link'

import Button from 'components/Button'
import Navbar from 'components/Navbar'
import routes from 'routes'
import { exampleAction, hasTriggeredExampleSelector } from 'flux/ducks/example'

import { AppContainer } from './App.styles'

export const UnwrappedApp = ({
    hasTriggeredExample,
    exampleAction,
    isLoggedIn,
}) => (
    <>
        <Navbar title="FE Template" />
        <AppContainer>
            Congrats, you started up the FE template.
            <br />
            Example has {!hasTriggeredExample && 'NOT '}been triggered.
            <br />
            <Button onClick={() => exampleAction()} type="button">
                Trigger Example Action
            </Button>
            <br />
            <Link href={isLoggedIn ? routes.HOME : routes.PROTECTED_HOME}>
                <a>Go to {isLoggedIn ? 'public' : 'private'} app</a>
            </Link>
        </AppContainer>
    </>
)

UnwrappedApp.propTypes = {
    exampleAction: PropTypes.func.isRequired,
    hasTriggeredExample: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool,
}

UnwrappedApp.defaultProps = {
    isLoggedIn: false,
}

const mapStateToProps = state => ({
    hasTriggeredExample: hasTriggeredExampleSelector(state),
})

const mapDispatchToProps = {
    exampleAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(UnwrappedApp)
