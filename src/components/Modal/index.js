import ReactDOM from "react-dom"
import PropTypes from "prop-types"

import Button from "components/Button"

import {
    ModalWrapper,
    ModalContentContainer,
    ModalFooter,
} from "./Modal.styles"

export const Modal = ({ content, onConfirm, onCancel }) => {
    return ReactDOM.createPortal(
        <ModalWrapper>
            <ModalContentContainer>{content}</ModalContentContainer>
            {onCancel || onConfirm ? (
                <ModalFooter>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={onConfirm}>Confirm</Button>
                </ModalFooter>
            ) : null}
        </ModalWrapper>,
        document.getElementById("app")
    )
}

Modal.propTypes = {
    content: PropTypes.node.isRequired,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
}

Modal.defaultProps = {
    onConfirm: null,
    onCancel: null,
}

export default Modal
