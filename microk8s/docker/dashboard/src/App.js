import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Nav from "./Nav"
import Preview from "./Preview"
import AceBoxLinks from "./AceBoxLinks"
import HowTo from "./how-to/HowTo"

const App = () => {
  const navPaths = {
    "How-To ACE Box": "/",
    "Deployment Preview": "/preview",
    "Links": "/links"
  }

  return (
    <BrowserRouter>
      <Nav
        navPaths={navPaths}
      />
      <main>
        <div className="layout__container">
          <div className="island">
            <Switch>
              <Route path="/preview">
                <Preview />
              </Route>
              <Route path="/links">
                <AceBoxLinks />
              </Route>
              <Route path="/">
                <HowTo />
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    </BrowserRouter>
  )
}

export { App as default }
