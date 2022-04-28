import styled from "styled-components"

import { Colours, Themes } from "constants/Branding"
import { FontSize } from "constants/Typography"

const getBackgroundColor = ({ theme, disabled = false }) => {
    if (disabled) {
        return Colours.White
    }

    switch (theme) {
        case Themes.Secondary:
            return Colours.Secondary
        default:
            return Colours.Primary
    }
}

const getTextSize = ({ theme }) => {
    switch (theme) {
        default:
            return FontSize.SM
    }
}

const getHoverColor = ({ theme }) => {
    switch (theme) {
        case Themes.Secondary:
            return Colours.Primary
        default:
            return Colours.Secondary
    }
}

const StyledButton = styled.button.attrs((props) => ({
    "aria-label": props.ariaLabel,
}))`
    padding: 10px 40px;
    font-size: ${getTextSize};
    border-radius: 3px;
    color: ${Colours.White};
    background-color: ${getBackgroundColor};
    transition-duration: 0.3s;
    cursor: ${(props) => (props.disabled ? "unset" : "pointer")};

    &:hover {
        background-color: ${getHoverColor};
    }
`

export default StyledButton
