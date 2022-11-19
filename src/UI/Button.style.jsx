import styled from "styled-components";

export const MyButton = styled.button`
  background-color: #60a5fa;
  color: #fff;
  border-radius: 8px;
  padding: 8px 24px;
  font-size: 14px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #4592f1;
  }

  &:active {
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  ${(props) => {
    switch (props.color) {
      case "danger":
        return `
        background-color: rgb(248 113 113);
        color: #fff;
        &:hover {
          background-color: rgb(239 68 68);
        }
        `;
      case "success":
        return `
          background-color: rgb(74 222 128);
          color: #fff;
          &:hover {
            background-color: rgb(34 197 94);
          }
        `;
      case "warning":
        return `
        background-color:  rgb(251 146 60);
        color:  #fff; 
        &:hover {
          background-color: rgb(249 115 22);
        }
        `;
    }
  }}
`;
