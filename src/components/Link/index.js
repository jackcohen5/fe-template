import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const getTextColor = (theme) => {
    switch (theme) {
        default:
            return 'blue'
    }
}

const getTextSize = (theme) => {
    switch (theme) {
        default:
            return '14px'
    }
}

const getHoverColor = (theme) => {
    switch (theme) {
        default:
            return 'white'
    }
}

const StyledLink = styled(Link)`
    font-size: ${(props) => getTextSize(props.theme)};
    color: ${(props) => getTextColor(props.theme)};
    padding: 5px;

    &:hover {
        background-color: ${(props) => getHoverColor(props.theme)};
        color: black;
    }
`

const LinkComponent = (props) => {
    const { label, ...otherProps } = props
    return (
        <StyledLink aria-label={label} {...otherProps}>
            {label}
        </StyledLink>
    )
}

LinkComponent.propTypes = {
    label: PropTypes.string.isRequired,
}

export default LinkComponent
