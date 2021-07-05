import styled from '@emotion/styled'

const ROBOTO = `'Roboto', sans;`
const POPPINS = `'Poppins', serif;`

export const Layout = styled.div`
  font-size: 16px;
  font-family: ${POPPINS};
  color: #333333;

  h1 {
    font-family: ${ROBOTO};
    font-size: 42px;
    margin: 0 0 10px;
  }

  h2 {
    font-family: ${ROBOTO};
    color: #999999;
    font-size: 24px;
    margin: 0 0 10px;
  }

  p {
    font-size: 22px;
    margin: 0 0 10px;
  }

  span {
  }

  header {
    background: #ff0099;
    padding: 20px;
  }

  section {
    margin: 20px 0;
    padding: 20px;
  }

  section[data-section='experience'] {
    ul,
    li {
      list-style: none;
      padding: 0;
    }
    li {
      padding-bottom: 1.5rem;
      border-left: 1px solid #333333;
      position: relative;
      padding-left: 20px;
      margin-left: 10px;
      &:last-child {
        border: 0px;
        padding-bottom: 0;
      }
      &:before {
        content: '';
        width: 15px;
        height: 15px;
        background: white;
        border: 1px solid #333333;
        box-shadow: 3px 3px 0px #333333;
        border-radius: 50%;
        position: absolute;
        left: -10px;
        top: 0px;
      }
    }
    [data-type='company'] {
      font-family: ${ROBOTO};
    }
    [data-type='time'] {
      margin-left: 5px;
      font-size: 14px;
    }
    [data-type='title'] {
      font-style: italic;
    }
    [data-type='description'] {
      font-size: 14px;
    }
  }
`
