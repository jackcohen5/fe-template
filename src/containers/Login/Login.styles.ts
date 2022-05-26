import styled from "styled-components"

import Button from "components/Button"
import { Colour } from "constants/Branding"
import InputText from "components/InputText"

export const LoginContainer = styled.main`
    width: calc(100% - 30px);

    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 30px;
    padding: 0 15px;
    margin-top: 120px;
    margin-right: auto;
    margin-left: auto;
    max-width: 1140px;
`

export const LoginForm = styled.form`
    background: ${Colour.White} 0 0 no-repeat padding-box;
    flex: 1 1 0px;
    padding: 15px;
    border-radius: 10px;
    margin-top: 5px;
    text-align: center;
    align-items: stretch;
`

export const LoginFormTitle = styled.h1`
    color: ${Colour.Primary};
    margin: 0 0 10px;
`

export const LoginFormSubtitle = styled.p`
    color: ${Colour.Secondary};
    margin: 0 0 50px;
`

export const LoginInputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`

export const LoginInputText = styled(InputText)``

export const ButtonSeparatorContainer = styled.div`
    display: flex;
    align-items: center;
`
export const ButtonSeparator = styled.div`
    border-bottom: 1px solid ${Colour.Secondary};
    height: 0px;
    flex-grow: 1;
`

export const ButtonSeparatorText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 10px;
    color: ${Colour.Secondary};
    flex-shrink: 1;
`

export const LoginAction = styled(Button)`
    flex: 1;
`
