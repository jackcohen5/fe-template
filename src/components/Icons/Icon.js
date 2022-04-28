import PropTypes from "prop-types"

import { IconBtn } from "./icon.styles"

const Icon = (props) => {
    const { children, color, onClick, ...otherProps } = props
    return (
        <IconBtn color={color} onClick={onClick}>
            <svg {...otherProps}>{children}</svg>
        </IconBtn>
    )
}

Icon.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func,
    xmlns: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    fill: PropTypes.string,
    stroke: PropTypes.string,
    strokeLinecap: PropTypes.string,
    strokeLinejoin: PropTypes.string,
    strokeWidth: PropTypes.number,
    viewBox: PropTypes.string,
}

Icon.defaultProps = {
    xmlns: "http://www.w3.org/2000/svg",
    color: "dark",
    height: 32,
    width: 32,
    fill: "none",
    stroke: "currentcolor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    viewBox: "0 0 32 32",
    onClick: () => {},
}

export default Icon
