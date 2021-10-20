import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Colours } from 'constants/Branding'

const getTextColor = (theme) => {
    switch (theme) {
        default:
            return Colours.Link
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
            return Colours.White
    }
}

const StyledLink = styled(Link)`
    font-size: ${(props) => getTextSize(props.theme)};
    color: ${(props) => getTextColor(props.theme)};
    padding: 5px;

    &:hover {
        background-color: ${(props) => getHoverColor(props.theme)};
        color: ${Colours.Black};
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
