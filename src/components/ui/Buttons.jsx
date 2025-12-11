
import styled, { css } from "styled-components";

export const CartButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .2s ease, transform .05s ease;

  &:hover { background-color: #218838; }
  &:active { transform: scale(0.98); }

  ${p => p.$variant === "primary" && css`
    background-color: #0d6efd;
    &:hover { background-color: #0b5ed7; }
  `}
  ${p => p.$variant === "secondary" && css`
    background-color: #6c757d;
    &:hover { background-color: #5c636a; }
  `}
  ${p => p.$variant === "danger" && css`
    background-color: #dc3545;
    &:hover { background-color: #c82333; }
  `}
  ${p => p.$variant === "warning" && css`
  background-color: #ffc107;
  color: #212529;
  &:hover { background-color: #e0a800; }
`}

`;

export const IconButton = styled.button`
  background: transparent;
  color: ${p => p.$color || "#6c757d"};
  border: 1px solid currentColor;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .35rem;
  font-size: .9rem;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;

  &:hover { background-color: rgba(0,0,0,.05); }

  ${p => p.$variant === "danger" && css`
    color: #dc3545;
  `}
`;
