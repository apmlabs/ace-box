import { useState, useEffect } from 'react'

const Preview = () => {
  const [iframeKey, setIframeKey] = useState(Math.random().toString(36).substring(7))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIframeKey(Math.random().toString(36).substring(7))
    }, 10000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <h2>Deployment preview - Demo</h2>
      <div className="section">
        <div className="column column--1-of-2">
          <h3>Staging</h3>
          <iframe title="staging" key={iframeKey} id="iframe1" height="600px" width="100%" src={process.env.REACT_APP_SIMPLENODEAPP_URL_STAGING} />
        </div>
        <div className="column column--1-of-2">
          <h3>Production</h3>
          <iframe title="production" key={iframeKey} id="iframe1" height="600px" width="100%" src={process.env.REACT_APP_SIMPLENODEAPP_URL_PRODUCTION} />
        </div>
      </div>
      {/* <h2>Deployment preview - Demo Canary</h2>
      <div className="section">
        <div className="column column--1-of-2">
          <h3>Canary</h3>
          <iframe title="staging" key={iframeKey} id="iframe1" height="600px" width="100%" src={process.env.REACT_APP_SIMPLENODEAPP_URL_CANARY} />
        </div>
      </div> */}
    </div>
  )
}

export { Preview as default }
