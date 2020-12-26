import styled from 'styled-components'

import { NavbarHeight } from 'components/Navbar'

export const AppContainer = styled.main`
    width: 100%;
    padding: ${NavbarHeight + 10}px 0 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
