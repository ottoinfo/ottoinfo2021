import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <style type='text/css' media='screen, print'>
            {`
            @font-face {
              font-display: swap;
              font-family: Roboto;
              src: url(/fonts/RobotoSlab-Regular.ttf);
            }
            @font-face {
              font-display: swap;
              font-family: Poppins;
              src: url(/fonts/Poppins-Thin.ttf);
            }
            `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
