import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
  ${(props) => {
    switch (props.display) {
      case "grid":
        return `
        @media(min-width: 1280px){
          grid-template-columns: 1fr 1fr;
        }
        `;
    }
  }}
`;
export const HeaderItem = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  width: 100%;
  background-color: #fff;
  padding: 1rem;
  gap: 1rem;
  .header__icon {
    font-size: 1.5rem;
    line-height: 2rem;
    padding: 0.5rem;
    border-radius: 0.375rem;
    margin-right: 100%;
    @media (min-width: 768px) {
      margin-right: 0;
    }
  }
  .header__button {
    margin-right: 100%;
    @media (min-width: 640px) {
      margin-right: 0;
      margin-left: auto;
    }
  }
  .header__content {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    @media (min-width: 768px) {
      gap: 1rem;
    }
    .header__title {
      font-size: 1.5rem;
    }
    .header__result {
      font-size: 1.25rem;
    }
  }
  ${(props) => {
    switch (props.type) {
      case "secondary":
        return `
          color: rgb(59 130 246);
          .header__icon{
            background-color: rgb(239 246 255)
          }
          `;
      case "danger":
        return `
            .header__icon {
              background-color: rgb(254 242 242);
            }
            color: rgb(248 113 113);
        `;
    }
  }}
`;
