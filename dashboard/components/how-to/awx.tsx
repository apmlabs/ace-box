import { FunctionComponent } from 'react'
import Link from 'next/link'
import { AwxLink, AwxUsername, AwxPassword } from '../credentials/awx'

type AwxProps = {}

const Awx: FunctionComponent<AwxProps> = () =>
  <div>
    <p><AwxLink /> is the open-source version of Ansible Tower. It provides a graphical user interface to create inventories and manage playbooks. You can log in using username <AwxUsername variant="inline" /> and password <AwxPassword variant="inline" /> (You can find all 
    credentials under <Link href="/links">Links</Link>). Please find more info about use cases below.</p>
  </div>

export { Awx as default }
