import { useState } from 'react'

import Nav from './Nav'
import Preview from './Preview'
import AceBoxLinks from './AceBoxLinks'
import HowTo from './HowTo'

const pages = {
  'HowTo': HowTo,
  'Deployment Preview': Preview,
  'Links': AceBoxLinks
}

const App = () => {
  const [activePageKey, setActivePageKey] = useState(Object.keys(pages)[0])

  return (
    <div>
      <Nav
        pageKeys={Object.keys(pages)}
        onPageKeySelect={pageKey => setActivePageKey(pageKey)}
      />
      <main>
        <div className="layout__container">
          <div className="island">
            {
              activePageKey === "HowTo" &&
                <HowTo />
            }
            {
              activePageKey === "Deployment Preview" &&
                <Preview />
            }
            {
              activePageKey === "Links" &&
                <AceBoxLinks />
            }
          </div>
        </div>
      </main>
    </div>
  )
}

export { App as default }
