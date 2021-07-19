import { FunctionComponent, useContext } from 'react'
import CredentialProvider from './provider'
import DetailTemplate from '../links/templates/details'
import LinkTemplate from './templates/link'
import UsernameTemplate from './templates/username'
import PasswordTemplate from './templates/password'
import TokenTemplate from './templates/token'
import type { CredentialProps } from './templates/types'

const Link: FunctionComponent<CredentialProps> = () => {
  const { gitea } = useContext(CredentialProvider)
  const { href, label } = gitea

  return (
    <LinkTemplate href={href || '#'} label={label || 'Gitea'} />
  )
}

const Username: FunctionComponent<CredentialProps> = ({ variant }) => {
  const { gitea } = useContext(CredentialProvider)
  const { username } = gitea

  return (
    <UsernameTemplate username={username} variant={variant} />
  )
}

const Password: FunctionComponent<CredentialProps> = ({ variant }) => {
  const { gitea } = useContext(CredentialProvider)
  const { password } = gitea

  return (
    <PasswordTemplate password={password} variant={variant} />
  )
}

const Token: FunctionComponent<CredentialProps> = ({ variant }) => {
  const { gitea } = useContext(CredentialProvider)
  const { token } = gitea

  return (
    <TokenTemplate token={token} variant={variant} />
  )
}

const GiteaLink = Link

const GiteaUsername = Username

const GiteaPassword = Password

const GiteaToken = Token

const DetailedLink = () => {
  const { gitea } = useContext(CredentialProvider)
  const { label, href } = gitea

  return (
    <DetailTemplate
      title={label || 'Gitea'}
      href={href || '#'}
      credentials={[GiteaUsername, GiteaPassword, GiteaToken]}
    />
  )
}

export { DetailedLink as default, Link, GiteaLink, Username, GiteaUsername, Password, GiteaPassword, Token, GiteaToken }
