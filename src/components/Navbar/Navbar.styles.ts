import styled from "styled-components"

import { Colour } from "constants/Branding"

import { NavbarHeight } from "./Navbar.constants"

export const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

export const Container = styled.nav`
    background-color: ${Colour.Primary};

    height: ${NavbarHeight}px;
    padding: 1rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const AvatarImg = styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 100px;
    border: 0px solid ${Colour.White};
`

export const Name = styled.span`
    color: ${Colour.White};
`
