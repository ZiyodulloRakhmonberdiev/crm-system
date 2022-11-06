import styled from 'styled-components'

export const IconButton = styled.button`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  ${props => {
    switch (props.color) {
      case 'danger':
        return `
          border: 1px solid rgb(248 113 113);
          color: rgb(248 113 113);
          &:hover {
            background-color: rgb(248 113 113);
            color: #fff;
          }
        `
      case 'dangerOutlined':
        return `
        background-color: rgb(248 113 113);
        color: #fff;
        &:hover {
          background-color: rgb(255 255 255);
          border: 1px solid rgb(248 113 113);
          color: rgb(248 113 113);
          }
        `
      case 'success':
        return `
          border: 1px solid #26d526;
          color: #26d526;
          &:hover {
            background-color: #26d526;
            color: #fff;
          }
        `
      case 'primary':
        return `
          border: 1px solid #60A5FA;
          color: #60A5FA;
          &:hover {
            background-color: #60A5FA;
            color: #fff;
          }
        `
      case 'primaryOutlined':
        return `
        background-color: #60A5FA;
        color: #fff;
        &:hover {
          border: 1px solid #60A5FA;
          background-color: #FFF;
          color: #60A5FA;
          }
        `
    }
  }}
`
