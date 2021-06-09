import AceBoxLink from './AceBoxLink'

const AceBoxLinks = () =>
  <div className="section homepage__cta section--bg section--light section--contenttop section--bgcover section--masthead">
    <ul style={{ paddingLeft: "10px" }}>
      {/* <li>Jenkins: <a href="http://jenkins.DOMAIN_PLACEHOLDER/" target="_blank" rel="noreferrer">http://jenkins.DOMAIN_PLACEHOLDER/</a> | user = admin | pass = dynatrace </li>
      <li>Gitea: <a href="http://gitea.DOMAIN_PLACEHOLDER/" target="_blank" rel="noreferrer">http://gitea.DOMAIN_PLACEHOLDER/</a> | user = GITEA_USER_PLACEHOLDER | pass = GITEA_USER_PLACEHOLDER | personal access token = GITEA_PAT_PLACEHOLDER</li>
      <li>Gitlab: <a href="http://gitlab.gitlab.DOMAIN_PLACEHOLDER/" target="_blank" rel="noreferrer">http://gitlab.gitlab.DOMAIN_PLACEHOLDER/</a> | user = root | pass = GITLAB_ROOT_PASSWORD_PLACEHOLDER | NOTE: not installed by default</li>
      <li>Keptn API: <a href="http://keptn.DOMAIN_PLACEHOLDER/api" target="_blank" rel="noreferrer">http://keptn.DOMAIN_PLACEHOLDER/api</a> | api token = KEPTN_API_TOKEN_PLACEHOLDER</li>
      <li>Keptn Bridge: <a href="http://keptn.DOMAIN_PLACEHOLDER/bridge" target="_blank" rel="noreferrer">http://keptn.DOMAIN_PLACEHOLDER/bridge/</a> | bridge user = KEPTN_BRIDGE_USER_PLACEHOLDER | bridge password = KEPTN_BRIDGE_PASSWORD_PLACEHOLDER</li>
      <li>Dynatrace: <a href="DYNATRACE_TENANT_PLACEHOLDER" target="_blank" rel="noreferrer">DYNATRACE_TENANT_PLACEHOLDER</a></li> */}
      <AceBoxLink title="Jenkins" href={process.env.REACT_APP_JENKINS_URL} credentials={[{ name: "user", value: process.env.REACT_APP_JENKINS_USER }, { name: "pass", value: process.env.REACT_APP_JENKINS_PASSWORD, type: "password" }]} />
      <AceBoxLink title="Gitea" href={process.env.REACT_APP_GITEA_URL} credentials={[{ name: "user", value: process.env.REACT_APP_GITEA_USER }, { name: "pass", value: process.env.REACT_APP_GITEA_PASSWORD, type: "password" }, { name: "token", value: process.env.REACT_APP_GITEA_PAT, type: "password" }]} />
      <AceBoxLink title="Gitlab" href={process.env.REACT_APP_GITLAB_URL} credentials={[{ name: "user", value: process.env.REACT_APP_GITLAB_USER }, { name: "pass", value: process.env.REACT_APP_GITLAB_PASSWORD, type: "password" }]} />
      <AceBoxLink title="Keptn API" href={process.env.REACT_APP_KEPTN_API_URL} credentials={[{ name: "token", value: process.env.REACT_APP_KEPTN_API_TOKEN, type: "password" }]} />
      <AceBoxLink title="Keptn Bridge" href={process.env.REACT_APP_KEPTN_BRIDGE_URL} credentials={[{ name: "user", value: process.env.REACT_APP_KEPTN_BRIDGE_USER }, { name: "pass", value: process.env.REACT_APP_KEPTN_BRIDGE_PASSWORD, type: "password" }]} />
      <AceBoxLink title="Dynatrace Tenant" href={process.env.REACT_APP_DT_TENANT_URL} />
    </ul>
  </div>

export { AceBoxLinks as default }
