// This is are DEFAULT RESETS and rules
import React from 'react'
import { css, Global } from '@emotion/react'

import { normalize } from 'polished'

// Resets and Global Styles applied to ALL Pages
const Styles = css`
  ${normalize()};
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  * {
    box-sizing: border-box;
  }
`

export const GlobalStyle = <Global styles={Styles} />

export default GlobalStyle
