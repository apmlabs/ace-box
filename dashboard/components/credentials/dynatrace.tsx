import { FunctionComponent, useContext } from 'react'
import CredentialProvider from './provider'
import DetailTemplate from '../links/templates/details'
import LinkTemplate from './templates/link'
import type { CredentialProps } from './templates/types'

const Link: FunctionComponent<CredentialProps> = () => {
  const { dynatrace } = useContext(CredentialProvider)
  const { href, label } = dynatrace

  return (
    <LinkTemplate href={href || '#'} label={label || 'Dynatrace'} />
  )
}

const DynatraceLink = Link

const DetailedLink = () => {
  const { dynatrace } = useContext(CredentialProvider)
  const { label, href } = dynatrace

  return (
    <DetailTemplate
      title={label || 'Dynatrace'}
      href={href || '#'}
    />
  )
}

export { DetailedLink as default, Link, DynatraceLink }
