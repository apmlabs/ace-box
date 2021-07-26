import { FunctionComponent } from 'react'
import { AceBoxCredential, AceBoxCredentialInline } from "./credentials"

type PasswordProps = {
  password: string | undefined
  variant?: string
}

const Password: FunctionComponent<PasswordProps> = ({ password, variant }) => variant === "inline"
  ? <AceBoxCredentialInline
      type="password"
      value={password}
    />
  : <AceBoxCredential
      name="Password"
      type="password"
      value={password}
    />

export { Password as default }
export type { PasswordProps }
