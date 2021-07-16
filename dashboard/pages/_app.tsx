import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import '@dynatrace/groundhog/dist/css/main.css'
import Layout from '../components/layout'

const MyApp = ({ Component, pageProps }: AppProps) => {
  dynamic(() => import('@dynatrace/groundhog/dist/js/main.js' as string), { ssr: false })

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export { MyApp as default }
