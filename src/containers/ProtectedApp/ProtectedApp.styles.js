import styled from 'styled-components'

import { FontSize } from 'src/constants/Typography'

export const AppContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const WelcomeMessage = styled.div`
    font-size: ${FontSize.MD};
`

export const LoginButtonContainer = styled.div`
    display: flex;
`
