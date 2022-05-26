import { Component, ReactNode } from "react"
import { captureException } from "logrocket"

import Button from "components/Button"

import { Container } from "./ErrorBoundary.styles"

type ErrorBoundaryProps = {
    tag: string
    children: ReactNode
}

type ErrorBoundaryState = {
    hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: Error) {
        captureException(error, {
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
                        ariaLabel="Refresh the page"
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

export default ErrorBoundary
