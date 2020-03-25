import styled from 'styled-components'

import { Colours } from 'src/constants/Branding'
import { FontSize } from 'src/constants/Typography'

export const Container = styled.nav`
    position: fixed;
    top: 0;
    left: 0;

    background-color: ${Colours.Primary};
    box-shadow: 0px 5px 5px 0px #bababa;

    width: 100%;
    height: 40px;

    display: flex;
`

export const TextContainer = styled.div`
    flex: 1 1;

    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    font-size: ${FontSize.LG};
`
