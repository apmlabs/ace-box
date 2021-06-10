const Nav = () =>
  <div className="nav has-no-secondary">
    <a className="nav__brand" href="/">
      <img className="nav__logo" src="http://assets.dynatrace.com/global/logos/dynatrace-logo.svg" alt="dynatrace logo" />
    </a>
    <nav id="nav-bar-example1" className="nav__bar">
      <ul className="nav__list nav__list--primary">
        {/* <li className="nav__item">
          <a className="nav__link" href="index.html">ACE-BOX</a>
        </li> */}
        <li className="nav__item">
          <a className="nav__link" target="_blank" rel="noreferrer" href={process.env.REACT_APP_JENKINS_URL}>Jenkins</a>
        </li>
        <li className="nav__item">
          <a className="nav__link" target="_blank" rel="noreferrer" href={process.env.REACT_APP_GITEA_URL}>Gitea</a>
        </li>
        <li className="nav__item">
          <a className="nav__link" target="_blank" rel="noreferrer" href={process.env.REACT_APP_KEPTN_BRIDGE_URL}>Keptn Bridge</a>
        </li>
        <li className="nav__item">
          <a className="nav__link" target="_blank" rel="noreferrer" href={process.env.REACT_APP_KEPTN_API_URL}>Keptn API Docs</a>
        </li>
        <li className="nav__item">
          <a className="nav__link" target="_blank" rel="noreferrer" href={process.env.REACT_APP_DT_TENANT_URL}>Dynatrace Tenant</a>
        </li>
      </ul>
    </nav>
  </div>

export { Nav as default }
