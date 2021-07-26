import { FunctionComponent } from 'react'
import { AceBoxCredential, AceBoxCredentialInline } from "./credentials"

type UsernameProps = {
  username: string | undefined
  variant?: string
}

const Username: FunctionComponent<UsernameProps> = ({ username, variant }) => variant === "inline"
  ? <AceBoxCredentialInline
      value={username}
    />
  : <AceBoxCredential
      name="User"
      value={username}
    />

export { Username as default }
