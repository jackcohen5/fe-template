import styled from "styled-components"

import { Colour } from "constants/Branding"

export const Spinner = styled.div`
    border: 10px solid ${Colour.White};
    border-top: 10px solid ${Colour.Primary};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

export const StretchContainer = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const Loader = ({
    className = "",
    isStretchy = false,
}: {
    className?: string
    isStretchy?: boolean
}) => {
    return isStretchy ? (
        <StretchContainer className={className}>
            <Spinner aria-label="loader" />
        </StretchContainer>
    ) : (
        <div className={className}>
            <Spinner aria-label="loader" />
        </div>
    )
}

export default Loader
