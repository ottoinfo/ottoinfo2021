import { AppProps } from 'next/app'
import GlobalStyles from './styles/global'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {GlobalStyles}
      <Component {...pageProps} />
    </>
  )
}
