import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; } // estilos iniciais
  to { opacity: 1; } // estilos finais
`;

const fadeOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0); }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(246, 245, 252, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css` animation: ${fadeOut} 0.3s;
`}
`
