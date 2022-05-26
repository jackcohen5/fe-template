import ReactDOM from "react-dom"

import Button from "components/Button"

import {
    ModalContentContainer,
    ModalFooter,
    ModalWrapper,
} from "./Modal.styles"

type ModalProps = {
    content: React.ReactNode
    onConfirm?: () => void
    onCancel?: () => void
}

export const Modal = ({ content, onConfirm, onCancel }: ModalProps) => {
    return ReactDOM.createPortal(
        <ModalWrapper>
            <ModalContentContainer>{content}</ModalContentContainer>
            {onCancel || onConfirm ? (
                <ModalFooter>
                    {onCancel ? (
                        <Button ariaLabel="Cancel" onClick={onCancel}>
                            Cancel
                        </Button>
                    ) : null}
                    {onConfirm ? (
                        <Button ariaLabel="Confirm" onClick={onConfirm}>
                            Confirm
                        </Button>
                    ) : null}
                </ModalFooter>
            ) : null}
        </ModalWrapper>,
        document.getElementById("app")
    )
}

export default Modal
