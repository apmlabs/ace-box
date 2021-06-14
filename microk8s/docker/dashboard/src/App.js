import React, { useState } from 'react'

import Nav from './Nav'
import Preview from './Preview'
import AceBoxLinks from './AceBoxLinks'
import HowTo from './how-to/HowTo'

const AppPages = ({ activePageIndex, children }) => {
  const allChildren = React.Children.toArray(children)

  return (
    <div className="layout__container">
      <div className="island">
        {allChildren[activePageIndex]}
      </div>
    </div>
  )

}

const App = () => {
  const [activePageIndex, setActivePageIndex] = useState(0)

  const navLabels = ['How-To ACE Box', 'Deployment Preview', 'Links']

  return (
    <div>
      <Nav
        pageKeys={navLabels}
        onPageKeySelect={pageKey => setActivePageIndex(navLabels.indexOf(pageKey))}
      />
      <main>
        <AppPages
          activePageIndex={activePageIndex}
        >
          <HowTo />
          <Preview />
          <AceBoxLinks />
        </AppPages>
      </main>
    </div>
  )
}

export { App as default }
