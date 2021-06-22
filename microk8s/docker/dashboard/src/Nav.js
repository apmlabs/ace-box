import { Link, useLocation } from "react-router-dom"

const Nav = ({ navPaths }) => {
  const { pathname: currentPathname } = useLocation()

  return (
    <div className="nav has-no-secondary">
      <a className="nav__brand" href="/">
        <img className="nav__logo" src="http://assets.dynatrace.com/global/logos/dynatrace-logo.svg" alt="dynatrace logo" />
      </a>
      <nav id="nav-bar-example1" className="nav__bar">
        <ul className="nav__list nav__list--primary">
          {
            navPaths && Object.keys(navPaths).map((pageKey, key) => {
              const pathname = navPaths[pageKey]
              const isCurrent = pathname === currentPathname

              return (
                <li key={key} className={`nav__item ${isCurrent ? "is-current" : ""}`}>
                  <Link className="nav__link" to={pathname}>{pageKey}</Link>
                </li>
              )
            })
          }
        </ul>
      </nav>
    </div>
  )
}

export { Nav as default }
