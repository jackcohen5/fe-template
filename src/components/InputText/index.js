import styled from 'styled-components'

import { Colours } from 'constants/Branding'
import { FontSize } from 'constants/Typography'

const InputText = styled.input.attrs(({ ariaLabel, type, ...inputProps }) => ({
    'aria-label': ariaLabel,
    type: type ?? 'text',
    ...inputProps,
}))`
    padding: 20px;
    width: calc(100% - 40px);
    border-radius: 4px;
    border: 1px solid
        ${(props) => (props.hasError ? Colours.Danger : Colours.Primary)};
    font-size: ${FontSize.MD};

    &:focus {
        border-color: ${(props) =>
            props.hasError ? Colours.Danger : Colours.Secondary};
        outline: 0;
    }
`

export default InputText
