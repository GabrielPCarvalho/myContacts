import styled from 'styled-components';

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(7px);
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 450px;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);

  h1 {
    font-size: 22px;
    color: ${({ theme, danger }) =>
      danger ? theme.colors.danger.main :
    theme.colors.gray[900]};
  }

  p {
    margin-top: 8px;
  }
`;

export const Footer = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    background: transparent;
    border: none;
    font-size: 16px;
    margin-right: 12px;
    color: ${({ theme }) => theme.colors.gray[200]};
  }
`;


