import { Link as Navlink } from "react-router-dom"
import { useGitlab } from "../libs/credentials"

const Gitlab = () => {
  const { Link, Username, Password } = useGitlab()

  return (
    <div>
      <p><Link /> is a local Git installation. As an alternative to Gitea it is not enabled by default. 
      It's main purpose is to host source code for the applications which will be deployed as part of some ACE box use cases.
      Additionally, Gitea is the place to go for step-by-step instructions for each use case. Some repositories require authentication. 
      You can log in using username <Username variant="inline" /> and password <Password variant="inline" /> (You 
      can find all credentials under <Navlink to="/links">Links</Navlink>). Please find more info about use cases below.</p>
    </div>
  )
}

export { Gitlab as default }
