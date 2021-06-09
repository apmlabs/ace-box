import { useState, useEffect } from 'react'

const Nav = () => {
  const [iframeKey, setIframeKey] = useState(Math.random().toString(36).substring(7))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIframeKey(Math.random().toString(36).substring(7))
    }, 10000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="section homepage__cta section--bg section--light section--contenttop section--bgcover section--masthead">
      <div className="column column--1-of-2" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <iframe title="staging" key={iframeKey} id="iframe1" height="600px" width="100%" src={process.env.REACT_APP_SIMPLENODEAPP_URL_STAGING} />
      </div>
      <div className="column column--1-of-2" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <iframe title="production" key={iframeKey} id="iframe1" height="600px" width="100%" src={process.env.REACT_APP_SIMPLENODEAPP_URL_PRODUCTION} />
      </div>
    </div>
  )
}

export { Nav as default }
