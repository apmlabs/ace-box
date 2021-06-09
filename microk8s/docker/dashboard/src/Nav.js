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
          <a className="nav__link" target="_blank" rel="noreferrer" href="http://jenkins.DOMAIN_PLACEHOLDER/">Jenkins</a>
        </li>
        <li className="nav__item">
          <a className="nav__link" target="_blank" rel="noreferrer" href="http://gitea.DOMAIN_PLACEHOLDER/">Gitea</a>
        </li>
        <li className="nav__item">
          <a className="nav__link" target="_blank" rel="noreferrer" href="https://bridge.keptn.DOMAIN_PLACEHOLDER/">Keptn Bridge</a>
        </li>
        <li className="nav__item">
          <a className="nav__link" target="_blank" rel="noreferrer" href="https://api.keptn.DOMAIN_PLACEHOLDER/swagger-ui">Keptn API</a>
        </li>
        <li className="nav__item">
          <a className="nav__link" target="_blank" rel="noreferrer" href="DYNATRACE_TENANT_PLACEHOLDER">Dynatrace Tenant</a>
        </li>
      </ul>
    </nav>
  </div>

export { Nav as default }
