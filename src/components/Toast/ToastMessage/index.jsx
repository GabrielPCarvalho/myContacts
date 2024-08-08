import { Container } from './styles';
import PropTypes from 'prop-types';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from "../../../assets/images/icons/check-circle.svg";

export function ToastMessage({ text, type }) {

  return (
    <Container type={type}>
      {type === "danger" && <img src={xCircleIcon} alt="Error" />}
      {type === "success" && <img src={checkCircleIcon} alt="Error" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'danger', 'default'])
}

ToastMessage.defaultProps = {
  type: 'default',
}
