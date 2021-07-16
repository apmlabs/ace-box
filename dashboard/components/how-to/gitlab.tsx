import { FunctionComponent } from 'react'
import Link from 'next/link'
import { GitlabLink, GitlabUsername, GitlabPassword } from '../credentials/gitlab'

type GitlabProps = {}

const Gitlab: FunctionComponent<GitlabProps> = () =>
  <div>
    <p><GitlabLink /> is a local Git installation. As an alternative to Gitea it is not enabled by default. 
    It&apos;s main purpose is to host source code for the applications which will be deployed as part of some ACE box use cases.
    Additionally, Gitea is the place to go for step-by-step instructions for each use case. Some repositories require authentication. 
    You can log in using username <GitlabUsername variant="inline" /> and password <GitlabPassword variant="inline" /> (You 
    can find all credentials under <Link href="/links">Links</Link>). Please find more info about use cases below.</p>
  </div>

export { Gitlab as default }
