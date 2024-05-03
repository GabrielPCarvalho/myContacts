import { Overlay } from "./styes";
import ReactDom from "react-dom";

const Loader = () => {
  return ReactDom.createPortal(
    <Overlay>
      <div className="loader"></div>
    </Overlay>,
    document.getElementById('loader-root')
  );
}

export default Loader;
