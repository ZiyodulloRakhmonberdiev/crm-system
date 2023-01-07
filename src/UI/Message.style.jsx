import styled from "styled-components";

export const MyMessage = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 16px;
  ${(props) => {
    switch (props.color) {
      case "danger":
        return `
        background-color: rgb(254 226 226);
        color: rgb(239 68 68);
        `;
      case "success":
        return `
          background-color: rgb(187 247 208);
          color: rgb(34 197 94);
        `;
      case "warning":
        return `
        background-color:  rgb(255 237 213);
        color:  rgb(249 115 22);
        `;
    }
  }}
`;
