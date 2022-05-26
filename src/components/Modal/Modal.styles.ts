import styled from "styled-components"

export const ModalWrapper = styled.div`
    position: fixed;
    min-height: 60%;
    min-width: 60%;
    top: 20%;
    left: 20%;

    background: white;
    border: 1px solid black;
    box-shadow: 0px 0px 5px 0px black;

    display: flex;
    flex-direction: column;
`

export const ModalContentContainer = styled.div`
    display: flex;
    flex: 1;
`

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px;
`
