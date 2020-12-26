import styled from 'styled-components'

import { Colours } from 'constants/Branding'

const getTextColor = (theme) => {
    switch (theme) {
        default:
            return Colours.Black
    }
}

const getBackgroundColor = (theme, disabled = false) => {
    if (disabled) {
        return Colours.White
    }

    switch (theme) {
        default:
            return Colours.Secondary
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

const StyledButton = styled.button.attrs((props) => ({
    'aria-label': props.ariaLabel,
}))`
    padding: 10px 40px;
    font-size: ${(props) => getTextSize(props.theme)};
    border-radius: 3px;
    color: ${(props) => getTextColor(props.theme)};
    background-color: ${(props) =>
        getBackgroundColor(props.theme, props.disabled)};
    transition-duration: 0.3s;
    cursor: ${(props) => (props.disabled ? 'unset' : 'pointer')};

    &:hover {
        background-color: ${(props) => getHoverColor(props.theme)};
        color: ${Colours.Black};
    }
`

export default StyledButton
