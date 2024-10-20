import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  input {
    width: 100%;
    border: none;
    border-radius: 6px;
    height: 50px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    outline: none;
    padding: 0 16px;

    &::placeholder {
      color: #BCBCBC;
    }
  }
`;
