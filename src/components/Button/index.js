import styled from 'styled-components'

const getTextColor = theme => {
    switch (theme) {
        default:
            return 'white'
    }
}

const getBackgroundColor = theme => {
    switch (theme) {
        default:
            return '#4CAF50'
    }
}

const getTextSize = theme => {
    switch (theme) {
        default:
            return '14px'
    }
}

const getHoverColor = theme => {
    switch (theme) {
        default:
            return 'white'
    }
}

export default styled.button`
    padding: 10px 40px;
    font-size: ${props => getTextSize(props.theme)};
    border-radius: 3px;
    color: ${props => getTextColor(props.theme)};
    background-color: ${props => getBackgroundColor(props.theme)};
    transition-duration: 0.3s;
    cursor: pointer;

    &:hover {
        background-color: ${props => getHoverColor(props.theme)};
        color: black;
    }
`
