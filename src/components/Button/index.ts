import React from "react"
import styled from "styled-components"

import { Colour, Theme } from "constants/Branding"
import { FontSize } from "constants/Typography"

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    ariaLabel: string
    disabled?: boolean
    theme?: Theme
}

const getBackgroundColor = ({ theme, disabled = false }: ButtonProps) => {
    if (disabled) {
        return Colour.White
    }

    switch (theme) {
        case Theme.Secondary:
            return Colour.Secondary
        default:
            return Colour.Primary
    }
}

const getTextSize = ({ theme }: ButtonProps) => {
    switch (theme) {
        default:
            return FontSize.SM
    }
}

const getHoverColor = ({ theme }: ButtonProps) => {
    switch (theme) {
        case Theme.Secondary:
            return Colour.Primary
        default:
            return Colour.Secondary
    }
}

const StyledButton = styled.button.attrs((props: ButtonProps) => ({
    "aria-label": props.ariaLabel,
}))`
    padding: 10px 40px;
    font-size: ${getTextSize};
    border-radius: 3px;
    color: ${Colour.White};
    background-color: ${getBackgroundColor};
    transition-duration: 0.3s;
    cursor: ${(props) => (props.disabled ? "unset" : "pointer")};

    &:hover {
        background-color: ${getHoverColor};
    }
`

export default StyledButton
