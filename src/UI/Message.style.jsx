import styled from "styled-components";

export const MyMessage = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  font-size: 16px;
  ${(props) => {
    switch (props.color) {
      case "danger":
        return `
        background-color: rgb(252 165 165);
        color: rgb(239 68 68);
        `;
      case "success":
        return `
          background-color: rgb(134 239 172);
          color: rgb(34 197 94);
        `;
      case "warning":
        return `
        background-color:  rgb(243 244 246);
        color:  rgb(243 244 246);
        `;
    }
  }}
`;
