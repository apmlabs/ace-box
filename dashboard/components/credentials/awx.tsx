import { FunctionComponent, useContext } from 'react'
import CredentialProvider from './provider'
import DetailTemplate from '../links/templates/details'
import LinkTemplate from './templates/link'
import UsernameTemplate from './templates/username'
import PasswordTemplate from './templates/password'
import type { CredentialProps } from './templates/types'

const Link: FunctionComponent<CredentialProps> = () => {
  const { awx } = useContext(CredentialProvider)
  const { href, label } = awx

  return (
    <LinkTemplate href={href} label={label} />
  )
}

const Username: FunctionComponent<CredentialProps> = ({ variant }) => {
  const { awx } = useContext(CredentialProvider)
  const { username } = awx

  return (
    <UsernameTemplate username={username} variant={variant} />
  )
}

const Password: FunctionComponent<CredentialProps> = ({ variant }) => {
  const { awx } = useContext(CredentialProvider)
  const { password } = awx

  return (
    <PasswordTemplate password={password} variant={variant} />
  )
}

const AwxLink = Link

const AwxUsername = Username

const AwxPassword = Password

const DetailedLink = () => {
  const { awx } = useContext(CredentialProvider)
  const { isEnabled, label, href } = awx

  return isEnabled
    ? <DetailTemplate
        title={label}
        href={href}
        credentials={[AwxUsername, AwxPassword]}
      />
    : null
}

export { DetailedLink as default, Link, AwxLink, Username, AwxUsername, Password, AwxPassword }
