import styled from 'styled-components'

import { Typography } from 'components/Branding'

export const AppContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const WelcomeMessage = styled.div`
    font-size: ${Typography.FontSize.MD}px;
`

export const LoginButtonContainer = styled.div`
    display: flex;
`
