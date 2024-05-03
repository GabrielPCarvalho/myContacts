import { Container } from './styles'
import PropTypes from 'prop-types'

import arrow from '../../assets/images/icons/arrow.svg'

const PageHeader = ({ title }) => {
  return (
    <Container>
      <a href='/'>
        <img src={arrow} alt="Go back" />
        <span>Voltar</span>
      </a>

      <h1>{title}</h1>
    </Container>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageHeader
