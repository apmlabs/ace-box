import { FunctionComponent, useContext } from 'react'
import CredentialProvider from './provider'
import DetailTemplate from '../links/templates/details'
import LinkTemplate from './templates/link'
import UsernameTemplate from './templates/username'
import PasswordTemplate from './templates/password'
import type { CredentialProps } from './templates/types'

const Link: FunctionComponent<CredentialProps> = () => {
  const { keptnBridge } = useContext(CredentialProvider)
  const { href, label } = keptnBridge

  return (
    <LinkTemplate href={href || '#'} label={label || 'Keptn Bridge'} />
  )
}

const Username: FunctionComponent<CredentialProps> = ({ variant }) => {
  const { keptnBridge } = useContext(CredentialProvider)
  const { username } = keptnBridge

  return (
    <UsernameTemplate username={username} variant={variant} />
  )
}

const Password: FunctionComponent<CredentialProps> = ({ variant }) => {
  const { keptnBridge } = useContext(CredentialProvider)
  const { password } = keptnBridge

  return (
    <PasswordTemplate password={password} variant={variant} />
  )
}

const KeptnBridgeLink = Link

const KeptnBridgeUsername = Username

const KeptnBridgePassword = Password

const DetailedLink = () => {
  const { keptnBridge } = useContext(CredentialProvider)
  const { href, label, isEnabled } = keptnBridge

  return isEnabled
  ? <DetailTemplate
      title={label || 'Keptn Bridge'}
      href={href || '#'}
      credentials={[KeptnBridgeUsername, KeptnBridgePassword]}
    />
  : null
}

export { DetailedLink as default, Link, KeptnBridgeLink, Username, KeptnBridgeUsername, Password, KeptnBridgePassword }
