import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'

const getTextColor = theme => {
    switch (theme) {
        default:
            return 'blue'
    }
}

const getTextSize = theme => {
    switch (theme) {
        default:
            return '14px'
    }
}

const StyledLink = styled.a.attrs(props => ({
    'aria-label': props.ariaLabel,
}))`
    font-size: ${props => getTextSize(props.theme)};
    color: ${props => getTextColor(props.theme)};

    &:hover {
        color: black;
    }
`

const LinkComponent = props => {
    const { href, ...otherProps } = props
    return (
        <Link href={href} passHref={true}>
            <StyledLink {...otherProps} />
        </Link>
    )
}

LinkComponent.propTypes = {
    ariaLabel: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    theme: PropTypes.string,
}

LinkComponent.defaultProps = {
    theme: null,
}

export default LinkComponent
