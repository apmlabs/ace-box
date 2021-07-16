import { FunctionComponent } from 'react'

import Navbar from './nav'

type LayoutProps = {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) =>
  <>
    <Navbar />
    <main>
      <div className="layout__container">
        <div className="island">
          {children}
        </div>
      </div>
    </main>
  </>

export { Layout as default }
