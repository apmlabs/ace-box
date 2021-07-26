import { FunctionComponent } from 'react'
import { AceBoxCredential, AceBoxCredentialInline } from "./credentials"

type TokenProps = {
  token: string | undefined
  variant?: string
}

const Token: FunctionComponent<TokenProps> = ({ token, variant }) => variant === "inline"
  ? <AceBoxCredentialInline
      type="password"
      value={token}
    />
  : <AceBoxCredential
      name="Token"
      type="password"
      value={token}
    />

export { Token as default }
