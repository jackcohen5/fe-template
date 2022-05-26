import styled from "styled-components"
import { Link } from "react-router-dom"

import { Colour, Theme } from "constants/Branding"

type LinkComponentProps = {
    label: string
    to: string
    theme?: Theme
}

const getTextColor = ({ theme }: LinkComponentProps) => {
    switch (theme) {
        default:
            return Colour.Link
    }
}

const getTextSize = ({ theme }: LinkComponentProps) => {
    switch (theme) {
        default:
            return "14px"
    }
}

const getHoverColor = ({ theme }: LinkComponentProps) => {
    switch (theme) {
        default:
            return Colour.White
    }
}

const StyledLink = styled(Link).attrs(
    ({ label, ...linkProps }: LinkComponentProps) => ({
        "aria-label": label,
        ...linkProps,
    })
)`
    font-size: ${getTextSize};
    color: ${getTextColor};
    padding: 5px;

    &:hover {
        background-color: ${getHoverColor};
        color: ${Colour.Black};
    }
`

const LinkComponent = (props: LinkComponentProps) => {
    return <StyledLink {...props}>{props.label}</StyledLink>
}

export default LinkComponent
