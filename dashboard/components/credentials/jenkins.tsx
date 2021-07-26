import { FunctionComponent, useContext } from 'react'
import CredentialProvider from './provider'
import DetailTemplate from '../links/templates/details'
import LinkTemplate from './templates/link'
import UsernameTemplate from './templates/username'
import PasswordTemplate from './templates/password'
import type { CredentialProps } from './templates/types'

const Link: FunctionComponent<CredentialProps> = () => {
  const { jenkins } = useContext(CredentialProvider)
  const { href, label } = jenkins

  return (
    <LinkTemplate href={href || '#'} label={label || 'Jenkins'} />
  )
}

const Username: FunctionComponent<CredentialProps> = ({ variant }) => {
  const { jenkins } = useContext(CredentialProvider)
  const { username } = jenkins

  return (
    <UsernameTemplate username={username} variant={variant} />
  )
}

const Password: FunctionComponent<CredentialProps> = ({ variant }) => {
  const { jenkins } = useContext(CredentialProvider)
  const { password } = jenkins

  return (
    <PasswordTemplate password={password} variant={variant} />
  )
}

const JenkinsLink = Link

const JenkinsUsername = Username

const JenkinsPassword = Password

const DetailedLink = () => {
  const { jenkins } = useContext(CredentialProvider)
  const { label, href } = jenkins

  return (
    <DetailTemplate
      title={label || 'Jenkins'}
      href={href || '#'}
      credentials={[JenkinsUsername, JenkinsPassword]}
    />
  )
}

export { DetailedLink as default, JenkinsLink, Link, JenkinsUsername, Username, JenkinsPassword, Password }
