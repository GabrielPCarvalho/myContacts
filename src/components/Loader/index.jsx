import { Overlay } from "./styes";
import ReactDom from "react-dom";
import PropTypes from "prop-types";

const Loader = ({ isLoading }) => {
  if(!isLoading) {
    return null;
  }

  return ReactDom.createPortal(
    <Overlay>
      <div className="loader"></div>
    </Overlay>,
    document.getElementById('loader-root')
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default Loader;
