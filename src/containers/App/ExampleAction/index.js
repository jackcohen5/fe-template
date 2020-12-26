import { memo } from 'react'
import PropTypes from 'prop-types'

import { ExampleContainer, MarginedButton } from './ExampleAction.styles'

const ExampleAction = ({
    buttonDisabled,
    buttonLabel,
    onClick,
    description,
}) => {
    return (
        <ExampleContainer>
            <MarginedButton
                ariaLabel={buttonLabel}
                disabled={buttonDisabled}
                onClick={onClick}
                type="button"
            >
                {buttonLabel}
            </MarginedButton>
            {description}
        </ExampleContainer>
    )
}

ExampleAction.propTypes = {
    buttonDisabled: PropTypes.bool,
    buttonLabel: PropTypes.string.isRequired,
    description: PropTypes.node,
    onClick: PropTypes.func.isRequired,
}

ExampleAction.defaultProps = {
    description: null,
    buttonDisabled: false,
}

export default memo(ExampleAction)
