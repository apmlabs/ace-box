import { Link as Navlink } from "react-router-dom"
import { useGitea } from "../libs/credentials"

const Gitea = () => {
  const { Link, Username, Password } = useGitea()

  return (
    <div>
      <p><Link /> is a local Git installation. It's main purpose is to host source code for the applications which will be deployed as part of some ACE box use cases.
      Additionally, Gitea is the place to go for step-by-step instructions for each use case. Some repositories require authentication. 
      You can log in using username <Username variant="inline" /> and password <Password variant="inline" /> (You can find all 
      credentials under <Navlink to="/links">Links</Navlink>). Please find more info about use cases below.</p>
    </div>
  )
}

export { Gitea as default }
