import { Component } from 'react'
import PropTypes from 'prop-types'
import LogRocket from 'logrocket'

import Button from 'components/Button'

import { Container } from './ErrorBoundary.styles'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error) {
        LogRocket.captureException(error, {
            tags: {
                errorBoundary: this.props.tag,
            },
        })
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container>
                    <h3>
                        Something went wrong. Please refresh the page to try
                        again.
                    </h3>
                    <Button
                        type="button"
                        onClick={() => window.location.reload()}
                    >
                        Refresh the page
                    </Button>
                </Container>
            )
        }

        return this.props.children
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    tag: PropTypes.string.isRequired,
}

export default ErrorBoundary
