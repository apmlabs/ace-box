import dynamic from 'next/dynamic'
import Head from 'next/head'

import '@dynatrace/groundhog/dist/css/main.css'
// import '@dynatrace/groundhog/dist/js/main.js'

const Links = () => {
  dynamic(() => import('@dynatrace/groundhog/dist/js/main.js' as string), { ssr: false })

  return (
  <div>
    <Head>
      <title>ACE Dashboard - Links</title>
      <meta name="description" content="ACE Dashboard" />
      {/* <link rel="icon" href="/favicon.ico" /> */}
    </Head>
    <main>
      Sth: {process.env.NEXT_PUBLIC_SIMPLENODEAPP_URL_STAGING}
    </main>
    <footer>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by ACE
      </a>
    </footer>
  </div>
  )
}

export { Links as default }
