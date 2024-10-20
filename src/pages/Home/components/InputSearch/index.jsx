import { Container } from "./styles"
import PropTypes from 'prop-types'

export default function InputSearch({ value, onChange }) {
  return (
    <Container>
      <input
        type='text'
        value={value}
        placeholder='Pesquise pelo nome...'
        onChange={onChange}
      />
    </Container>
  )
}

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
