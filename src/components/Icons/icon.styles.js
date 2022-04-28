import styled from "styled-components"

import { Colours } from "constants/Branding"

const getColor = (color) => {
    switch (color) {
        case "danger":
            return Colours.Danger
        default:
            return Colours.Black
    }
}

export const IconBtn = styled.div`
    cursor: pointer;
    color: ${({ color }) => getColor(color)};

    &:hover {
        opacity: 0.8;
    }
`
