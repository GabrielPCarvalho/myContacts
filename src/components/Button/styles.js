import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  height: 52px;
  border: none;
  padding: 0 16px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  transition: background 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background: #ccc !important;
    cursor: default !important;
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.danger.main};

    &:hover {
    background-color: ${theme.colors.danger.light};
    }

    &:active {
    background-color: ${theme.colors.danger.dark};
    }
  `}
`;
