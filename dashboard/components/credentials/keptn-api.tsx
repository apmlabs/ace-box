import { FunctionComponent, useContext } from 'react'
import CredentialProvider from './provider'
import DetailTemplate from '../links/templates/details'
import LinkTemplate from './templates/link'
import TokenTemplate from './templates/token'
import type { CredentialProps } from './templates/types'

const Link: FunctionComponent<CredentialProps> = () => {
  const { keptnApi } = useContext(CredentialProvider)
  const { href, label } = keptnApi

  return (
    <LinkTemplate href={href || '#'} label={label || 'Keptn API'} />
  )
}

const Token: FunctionComponent<CredentialProps> = ({ variant }) => {
  const { keptnApi } = useContext(CredentialProvider)
  const { token } = keptnApi

  return (
    <TokenTemplate token={token} variant={variant} />
  )
}

const KeptnApiLink = Link

const KeptnApiToken = Token

const DetailedLink = () => {
  const { keptnApi } = useContext(CredentialProvider)
  const { href, label } = keptnApi

  return (
    <DetailTemplate
      title={label || 'Keptn API'}
      href={href || '#'}
      credentials={[KeptnApiToken]}
    />
  )
}

export { DetailedLink as default, Link, KeptnApiLink, Token, KeptnApiToken }
