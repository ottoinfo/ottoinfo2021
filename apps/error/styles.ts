import styled from '@emotion/styled'

const ROBOTO = `'Roboto', sans;`
const POPPINS = `'Poppins', serif;`

export const Layout = styled.div`
  font-size: 16px;
  font-family: ${POPPINS};
  color: #333333;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;

  p {
    font-size: 22px;
    margin: 0 0 10px;
    font-family: ${ROBOTO};
  }
`
