import React, { useState } from "react"
import { useGitea, useGitlab } from "../libs/credentials"

import Jenkins from "./Jenkins"
import Gitea from "./Gitea"
import Gitlab from "./Gitlab"
import Keptn from "./Keptn"
import Dynatrace from "./Dynatrace"
import Kubernetes from "./Kubernetes"

const ToolTabs = () => {
  const { isEnabled: isGitlabEnabled } = useGitlab()

  const tabs = {
    "Jenkins": Jenkins,
    "Gitea": Gitea,
    "Gitlab": Gitlab,
    "Keptn": Keptn,
    "Dynatrace": Dynatrace,
    "Kubernetes": Kubernetes
  }

  if (!isGitlabEnabled) {
    delete tabs["Gitlab"]
  }

  const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0])
  const ActiveTabContent = tabs[activeTab]

  return (
    <>
      <div className="tabs" style={{ marginBottom: "13px" }}>
        {
          Object.keys(tabs).map((tab, key) => {
            const isActive = tab === activeTab

            return (
              <button
                key={key}
                className={`tab ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            )
          })
        }
      </div>
      <div>
        <ActiveTabContent />
      </div>
    </>
  )
}

const HowTo = ({ isGitlabEnabled }) => {
  const { href: giteaHref } = useGitea()

  return (
    <div>
      <>
        <h2>How-To</h2>
        <p>Welcome to your personal ACE Box! It comes with a set of already configured tools, code, pipelines, etc. to showcase a selection of cloud automation use cases.</p>
        <p>
          Before you get started, please familiarize yourself with the Dashboard you're currently looking at:
        </p>
        <ul>
          <li>A <b>How-To</b> gives you step-by-step instructions for each use case.</li>
          <li>As the name indicates, <b>Deployment Preview</b> shows you the currently deployed version of a demo application up in each stage. Don't worry, the error you're seeing is fine for now as the application is not deployed yet. You will fix this as part of one the first use cases.</li>
          <li><b>Links</b> lists tools and credentials that you will need while going through the use cases.</li>
        </ul>
        <p>
          In addition he following tools have been set up and configured (click on each tab to get an overview of what's been configured):
        </p>
      </>
      <ToolTabs isGitlabEnabled={isGitlabEnabled} />
      <>
        <h2>Use Cases</h2>
        <p>
          The following list shows use cases currently supported by ACE Box. Please follow the link for step-by-step instructions.
        </p>
        <dl className="definition-list">
          <dt>All-in-one</dt>
          <dd><a href={`${giteaHref}/ace/ace`} target="_blank" rel="noreferrer">Step-by-step instructions</a></dd>
          {/* <dt>monaco-gitops-demo</dt>
          <dd><a href={`${giteaHref}/`}>Step-by-step instructions</a></dd> */}
          <dt>Monaco - Hands-on Training</dt>
          <dd><a href={`${giteaHref}/monaco-hot/monaco-hot`}>Step-by-step instructions</a></dd>
          <dt>Quality Gates - Hands-on Training</dt>
          <dd><a href={`${giteaHref}/quality-gates-hot/lab-guides`} target="_blank" rel="noreferrer">Step-by-step instructions</a></dd>
        </dl>
        {/* <p>In case you have any questions, please reach out to: ...Email / Slack / etc?... You can also find us on ...Github link... </p> */}
      </>
    </div>
  )
}

export { HowTo as default }
