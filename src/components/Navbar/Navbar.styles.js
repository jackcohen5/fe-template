import styled from 'styled-components'

import { Colours } from 'constants/Branding'
import { FontSize } from 'constants/Typography'

import { NavbarHeight } from './Navbar.constants'

export const Container = styled.nav`
    position: fixed;
    top: 0;
    left: 0;

    background-color: ${Colours.Primary};
    box-shadow: 0px 5px 5px 0px #bababa;

    width: 100%;
    height: ${NavbarHeight}px;

    display: flex;
`

export const TextContainer = styled.div`
    flex: 1 1;

    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    color: ${Colours.White};
    font-size: ${FontSize.LG};
`
