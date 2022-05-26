import styled from "styled-components"

import { Colour } from "constants/Branding"
import { FontSize } from "constants/Typography"

type InputTextProps = {
    ariaLabel: string
    type: React.HTMLInputTypeAttribute
    hasError: boolean
}

const InputText = styled.input.attrs(
    ({ ariaLabel, type, ...inputProps }: InputTextProps) => ({
        "aria-label": ariaLabel,
        type: type ?? "text",
        ...inputProps,
    })
)`
    padding: 20px;
    width: calc(100% - 40px);
    border-radius: 4px;
    border: 1px solid
        ${(props) => (props.hasError ? Colour.Danger : Colour.Primary)};
    font-size: ${FontSize.MD};

    &:focus {
        border-color: ${(props) =>
            props.hasError ? Colour.Danger : Colour.Secondary};
        outline: 0;
    }
`

export default InputText
