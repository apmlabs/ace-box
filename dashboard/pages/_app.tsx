import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) =>
  <Component {...pageProps} />

export { MyApp as default }
