import { Overlay, Container, Footer } from "./styles";
import PropTypes from "prop-types";
import Button from "../Button";
import ReactPortal from "../ReactPortal";


const Modal = ({
  danger,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  visible,
  isLoading,
}) => {

  if (!visible) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>
        <div className="modal-body">
          {children}
        </div>

        <Footer>
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>
          <Button
            type="button"
            danger={danger}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>
    </ReactPortal>
  )

}

Modal.propTypes = {
  danger: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

Modal.defaultProps = {
  danger: false,
  isLoading: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
}

export default Modal;
