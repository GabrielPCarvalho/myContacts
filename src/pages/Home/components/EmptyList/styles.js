import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;

  p {
    color: ${({ theme }) => theme.colors.gray[200]};
    text-align: center;
    margin-top: 8px;

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;
