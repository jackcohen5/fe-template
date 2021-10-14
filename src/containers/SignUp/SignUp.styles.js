import styled from 'styled-components'

import Button from 'components/Button'
import { Colours } from 'constants/Branding'
import InputText from 'components/InputText'
import Link from 'components/Link'

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
    background: ${Colours.White} 0 0 no-repeat padding-box;
    flex: 1 1 0px;
    padding: 15px;
    border-radius: 10px;
    margin-top: 5px;
    text-align: center;
    align-items: stretch;
`

export const LoginFormTitle = styled.h1`
    color: ${Colours.Primary};
    margin: 0 0 10px;
`

export const LoginFormSubtitle = styled.p`
    color: ${Colours.Secondary};
    margin: 0 0 50px;
`

export const LoginInputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`

export const AlreadySignedUpContainer = styled.div`
    margin: 0 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LoginInputText = styled(InputText)``

export const InlineLoginInputText = styled(InputText)`
    margin-right: 10px;
`

export const LoginLink = styled(Link)`
    color: ${Colours.Primary};
`

export const LoginAction = styled(Button)`
    flex: 1;
`
