import { Overlay, Container, Footer } from "./styles";
import PropTypes from "prop-types";
import ReactDom from "react-dom";
import Button from "../Button";


const Modal = ({ danger }) => {
  return ReactDom.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Tem certeza de que deseja remover o contato “Gabriel Carvalho”?</h1>
        <p>Esta ação não poderá ser desfeita!</p>

        <Footer>
          <button type="button" className="cancel-button">Cancelar</button>
          <Button type="button" danger={danger}>
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root')
  )

}

Modal.propTypes = {
  danger: PropTypes.bool
}

Modal.defaultProps = {
  danger: false
}

export default Modal;
