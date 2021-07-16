import { useState, useEffect, useContext, FunctionComponent } from 'react'
import CredentialProvider from '../credentials/provider'
import PreviewProvider from './provider'

type PreviewProps = {}

const Preview: FunctionComponent<PreviewProps> = () => {
  const { awx } = useContext(CredentialProvider)

  const { isEnabled: isAwxEnabled } = awx

  const { staging, production, canary } = useContext(PreviewProvider)

  const stagingHref = staging.href
  const productionHref = production.href
  const canaryHref = canary.href

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
          <iframe title="staging" key={iframeKey} id="iframe1" height="600px" width="100%" src={stagingHref} />
          <div>({stagingHref})</div>
        </div>
        <div className="column column--1-of-2">
          <h3>Production</h3>
          <iframe title="production" key={iframeKey} id="iframe1" height="600px" width="100%" src={productionHref} />
          <div>({productionHref})</div>
        </div>
      </div>
      {
        isAwxEnabled &&
          <>
            <h2>Deployment preview - Demo Canary</h2>
            <div className="section">
              <div className="column column--1-of-2">
                <h3>Canary</h3>
                <iframe title="canary" key={iframeKey} id="iframe3" height="600px" width="100%" src={canaryHref} />
                <div>({canaryHref})</div>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export { Preview as default }
