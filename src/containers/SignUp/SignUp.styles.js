import styled from 'styled-components'

import Button from 'components/Button'
import { Colours } from 'constants/Branding'
import InputText from 'components/InputText'
import Link from 'components/Link'

export const SignUpContainer = styled.main`
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

export const SignUpForm = styled.form`
    background: ${Colours.White} 0 0 no-repeat padding-box;
    flex: 1 1 0px;
    padding: 15px;
    border-radius: 10px;
    margin-top: 5px;
    text-align: center;
    align-items: stretch;
`

export const SignUpFormTitle = styled.h1`
    color: ${Colours.Primary};
    margin: 0 0 10px;
`

export const SignUpFormSubtitle = styled.p`
    color: ${Colours.Secondary};
    margin: 0 0 50px;
`

export const SignUpInputContainer = styled.div`
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

export const SignUpInputText = styled(InputText)``

export const InlineSignUpInputText = styled(InputText)`
    margin-right: 10px;
`

export const LoginLink = styled(Link)`
    color: ${Colours.Primary};
`

export const SignUpAction = styled(Button)`
    flex: 1;
`
