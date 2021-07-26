import { FunctionComponent } from 'react'
import Link from 'next/link'
import { GiteaLink, GiteaUsername, GiteaPassword } from '../credentials/gitea'

type GiteaProps = {}

const Gitea: FunctionComponent<GiteaProps> = () =>
  <div>
    <p><GiteaLink /> is a local Git installation. It&apos;s main purpose is to host source code for the applications which will be deployed as part of some ACE box use cases.
    Additionally, Gitea is the place to go for step-by-step instructions for each use case. Some repositories require authentication. 
    You can log in using username <GiteaUsername variant="inline" /> and password <GiteaPassword variant="inline" /> (You can find all 
    credentials under <Link href="/links">Links</Link>). Please find more info about use cases below.</p>
  </div>

export { Gitea as default }
