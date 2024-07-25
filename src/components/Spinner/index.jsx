import { StyledSpinner } from './styles';
import PropTypes from 'prop-types';

const Spinner = ({ size }) => {
  return <StyledSpinner size={size} />;
}

Spinner.propTypes = {
  size: PropTypes.number.isRequired,
}

Spinner.defaultProps = {
  size: 32,
}

export default Spinner;
