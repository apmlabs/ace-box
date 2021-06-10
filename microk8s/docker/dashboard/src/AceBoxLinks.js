import { useState } from 'react'

import AceBoxCredentials from './AceBoxCredentials'

const AceBoxLinkDetails = ({ title, href, credentials }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <tbody className={`expandable ${isExpanded ? "is-active" : ""}`}>
      <tr>
        <td>{title}</td>
        <td><a href={href}>{href}</a></td>
        <td>
          {
            !!credentials &&
              <button href="#" className="expandable__trigger" style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }} onClick={() => setIsExpanded(isExpanded => !isExpanded)}>more</button>
          }
        </td>
      </tr>
      <tr className="">
        {
          isExpanded &&
            <td colSpan="3">
              <AceBoxCredentials credentials={credentials} />
            </td>
        }
      </tr>
    </tbody>
  )
}

const AceBoxLinks = () =>
  <div>
    <h2>Credentials</h2>
    <div className="section">
      <table className="table table--expandable">
        <thead>
          <tr>
            <th></th>
            <th>URL</th>
            <th>Details</th>
          </tr>
        </thead>
        <AceBoxLinkDetails
          title="Jenkins"
          href={process.env.REACT_APP_JENKINS_URL}
          credentials={[{ name: "user", value: process.env.REACT_APP_JENKINS_USER }, { name: "pass", value: process.env.REACT_APP_JENKINS_PASSWORD, type: "password" }]}
        />
        <AceBoxLinkDetails
          title="Gitea"
          href={process.env.REACT_APP_GITEA_URL}
          credentials={[{ name: "user", value: process.env.REACT_APP_GITEA_USER }, { name: "pass", value: process.env.REACT_APP_GITEA_PASSWORD, type: "password" }, { name: "token", value: process.env.REACT_APP_GITEA_PAT, type: "password" }]}
        />
        <AceBoxLinkDetails
          title="Gitlab"
          href={process.env.REACT_APP_GITLAB_URL}
          credentials={[{ name: "user", value: process.env.REACT_APP_GITLAB_USER }, { name: "pass", value: process.env.REACT_APP_GITLAB_PASSWORD, type: "password" }]}
        />
        <AceBoxLinkDetails
          title="Keptn API"
          href={process.env.REACT_APP_KEPTN_API_URL}
          credentials={[{ name: "token", value: process.env.REACT_APP_KEPTN_API_TOKEN, type: "password" }]}
        />
        <AceBoxLinkDetails
          title="Keptn Bridge"
          href={process.env.REACT_APP_KEPTN_BRIDGE_URL}
          credentials={[{ name: "user", value: process.env.REACT_APP_KEPTN_BRIDGE_USER }, { name: "pass", value: process.env.REACT_APP_KEPTN_BRIDGE_PASSWORD, type: "password" }]}
        />
        <AceBoxLinkDetails
          title="Dynatrace Tenant"
          href={process.env.REACT_APP_DT_TENANT_URL}
        />
      </table>
    </div>
  </div>

export { AceBoxLinks as default }
