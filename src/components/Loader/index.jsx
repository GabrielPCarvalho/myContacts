import { Overlay } from "./styes";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import Spinner from "../Spinner";

const Loader = ({ isLoading }) => {
  if(!isLoading) {
    return null;
  }

  return ReactDom.createPortal(
    <Overlay>
      <Spinner size={90} />
    </Overlay>,
    document.getElementById('loader-root')
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default Loader;
