import PropTypes from "prop-types"
import styled from "styled-components"

import { Colours } from "constants/Branding"

export const Spinner = styled.div`
    border: 10px solid ${Colours.White};
    border-top: 10px solid ${Colours.Primary};
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

export const Loader = ({ className, isStretchy }) => {
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

Loader.propTypes = {
    className: PropTypes.string,
    isStretchy: PropTypes.bool,
}

Loader.defaultProps = {
    className: "",
    isStretchy: false,
}

export default Loader
