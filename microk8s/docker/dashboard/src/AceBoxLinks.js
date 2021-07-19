import { useState } from "react"
import { useJenkins, useGitea, useGitlab, useAwx, useKeptnApi, useKeptnBridge, useDynatrace } from "./libs/credentials"

const AceBoxLinkDetails = ({ title, href, credentials }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <tbody className={`expandable ${isExpanded ? "is-active" : ""}`}>
      <tr>
        <td>{title}</td>
        <td><a href={href} target="_blank" rel="noreferrer">{href}</a></td>
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
              <div style={{ display: "grid", gridTemplateColumns: "auto", rowGap: "10px" }}>
                {
                  !!credentials && credentials.map((Credential, key) =>
                    <Credential key={key} />
                  )
                }
              </div>
            </td>
        }
      </tr>
    </tbody>
  )
}

const AceBoxLinks = () => {
  const { href: jenkinsHref, Username: JenkinsUsername, Password: JenkinsPassword } = useJenkins()
  const { href: giteaHref, Username: GiteaUsername, Password: GiteaPassword, Token: GiteaToken } = useGitea()
  const { isEnabled: isGitlabEnabled, href: gitlabHref, Username: GitlabUsername, Password: GitlabPassword } = useGitlab()
  const { isEnabled: isAwxEnabled, href: awxHref, Username: AwxUsername, Password: AwxPassword } = useAwx()
  const { href: keptnApiHref, Token: KeptnApiToken } = useKeptnApi()
  const { href: keptnBridgeHref, Username: KeptnBridgeUsername, Password: KeptnBridgePassword } = useKeptnBridge()
  const { href: dynatraceHref } = useDynatrace()

  return (
    <div>
      <h2>Links</h2>
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
            href={jenkinsHref}
            credentials={[JenkinsUsername, JenkinsPassword]}
          />
          <AceBoxLinkDetails
            title="Gitea"
            href={giteaHref}
            credentials={[GiteaUsername, GiteaPassword, GiteaToken]}
          />
          {
            isGitlabEnabled &&
              <AceBoxLinkDetails
                title="Gitlab"
                href={gitlabHref}
                credentials={[GitlabUsername, GitlabPassword]}
              />
          }
          {
            isAwxEnabled &&
              <AceBoxLinkDetails
                title="AWX"
                href={awxHref}
                credentials={[AwxUsername, AwxPassword]}
              />
          }
          <AceBoxLinkDetails
            title="Keptn API"
            href={keptnApiHref}
            credentials={[KeptnApiToken]}
          />
          <AceBoxLinkDetails
            title="Keptn Bridge"
            href={keptnBridgeHref}
            credentials={[KeptnBridgeUsername, KeptnBridgePassword]}
          />
          <AceBoxLinkDetails
            title="Dynatrace Tenant"
            href={dynatraceHref}
          />
        </table>
      </div>
    </div>
  )
}

export { AceBoxLinks as default }
