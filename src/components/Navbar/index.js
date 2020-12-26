import PropTypes from 'prop-types'

import { Container, TextContainer } from './Navbar.styles'

export const Navbar = ({ title }) => {
    return (
        <Container>
            <TextContainer>{title}</TextContainer>
        </Container>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
}

export { NavbarHeight } from './Navbar.constants'
export default Navbar
