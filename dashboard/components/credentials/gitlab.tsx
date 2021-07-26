import { FunctionComponent, useContext } from 'react'
import CredentialProvider from './provider'
import DetailTemplate from '../links/templates/details'
import LinkTemplate from './templates/link'
import UsernameTemplate from './templates/username'
import PasswordTemplate from './templates/password'
import type { CredentialProps } from './templates/types'

const Link: FunctionComponent<CredentialProps> = () => {
  const { gitlab } = useContext(CredentialProvider)
  const { href, label } = gitlab

  return (
    <LinkTemplate href={href || '#'} label={label || 'Gitlab'} />
  )
}

const Username: FunctionComponent<CredentialProps> = ({ variant }) => {
  const { gitlab } = useContext(CredentialProvider)
  const { username } = gitlab

  return (
    <UsernameTemplate username={username} variant={variant} />
  )
}

const Password: FunctionComponent<CredentialProps> = ({ variant }) => {
  const { gitlab } = useContext(CredentialProvider)
  const { password } = gitlab

  return (
    <PasswordTemplate password={password} variant={variant} />
  )
}

const GitlabLink = Link

const GitlabUsername = Username

const GitlabPassword = Password

const DetailedLink = () => {
  const { gitlab } = useContext(CredentialProvider)
  const { isEnabled, label, href } = gitlab

  return isEnabled
    ? <DetailTemplate
        title={label || 'Gitlab'}
        href={href || '#'}
        credentials={[GitlabUsername, GitlabPassword]}
      />
    : null
}

export { DetailedLink as default, Link, GitlabLink, Username, GitlabUsername, Password, GitlabPassword }
