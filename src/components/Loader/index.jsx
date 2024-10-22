import { Overlay } from "./styes";

import PropTypes from "prop-types";

import Spinner from "../Spinner";

import ReactPortal from "../ReactPortal";

import UseAnimatedUnmount from "../../hooks/useAnimatedUnmount";


const Loader = ({ isLoading }) => {
  const { animatedElementRef, shouldRender } = UseAnimatedUnmount(isLoading);

  if(!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId='loader-root'>
      <Overlay isLeaving={!isLoading} ref={animatedElementRef}>
      <Spinner size={90} />
    </Overlay>,
    </ReactPortal>
  )
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default Loader;
