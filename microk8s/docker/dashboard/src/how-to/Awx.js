import { Link as Navlink } from "react-router-dom"
import { useAwx } from "../libs/credentials"

const Awx = () => {
  const { Link, Username, Password } = useAwx()

  return (
    <div>
      <p><Link /> is the open-source version of Ansible Tower. It provides a graphical user interface to create inventories and manage playbooks. You can log in using username <Username variant="inline" /> and password <Password variant="inline" /> (You can find all 
      credentials under <Navlink to="/links">Links</Navlink>). Please find more info about use cases below.</p>
    </div>
  )
}

export { Awx as default }
