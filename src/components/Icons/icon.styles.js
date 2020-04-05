import styled from 'styled-components'

const getColor = (color) => {
    switch (color) {
        case 'danger':
            return 'rgb(158, 26, 26)'
        default:
            return 'black'
    }
}

export const IconBtn = styled.div`
    cursor: pointer;
    color: ${({ color }) => getColor(color)};

    &:hover {
        opacity: 0.8;
    }
`
