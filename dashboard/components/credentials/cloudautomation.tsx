import { FunctionComponent, useContext } from 'react'
import CredentialProvider from './provider'
import DetailTemplate from '../links/templates/details'
import LinkTemplate from './templates/link'
import type { CredentialProps } from './templates/types'

const Link: FunctionComponent<CredentialProps> = () => {
  const { cloudAutomation } = useContext(CredentialProvider)
  const { href, label } = cloudAutomation

  return (
    <LinkTemplate href={href || '#'} label={label || 'Cloud Automation'} />
  )
}

const CloudAutomationLink = Link

const DetailedLink = () => {
  const { cloudAutomation } = useContext(CredentialProvider)
  const { label, href } = cloudAutomation

  return (
    <DetailTemplate
      title={label || 'Cloud Automation'}
      href={href || '#'}
    />
  )
}

export { DetailedLink as default, Link, CloudAutomationLink }
