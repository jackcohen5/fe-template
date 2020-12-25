import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import Button from 'components/Button'
import Navbar from 'components/Navbar'
import routes from 'routes'

import { exampleAction, hasTriggeredExampleSelector } from 'flux/ducks/example'

import { AppContainer, StyledLink } from './App.styles'

export const UnwrappedApp = ({ hasTriggeredExample, exampleAction }) => {
    const { pathname } = useLocation()
    const linkParams =
        pathname === routes.HOME
            ? {
                  to: routes.PROTECTED_HOME,
                  label: 'Go to private app',
              }
            : {
                  to: routes.HOME,
                  label: 'Go to public app',
              }
    return (
        <>
            <Navbar title="FE Template" />
            <AppContainer>
                <div>Congrats, you started up the FE template.</div>
                <div>
                    Example has {!hasTriggeredExample && 'NOT '}been triggered.
                </div>
                <Button
                    ariaLabel="Trigger Example"
                    onClick={() => exampleAction()}
                    type="button"
                >
                    Trigger Example Action
                </Button>
                <StyledLink {...linkParams} />
            </AppContainer>
        </>
    )
}

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
