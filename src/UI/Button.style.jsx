import styled from "styled-components";

export const MyButton = styled.button`
  background-color: #60A5FA;
  color: #fff;
  border-radius: 8px;
  padding: 8px 24px;
  font-size: 14px;
  transition: all 0.3s ease;
  &:hover{
    background-color: #4592f1;
  }

  &:active {
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
`