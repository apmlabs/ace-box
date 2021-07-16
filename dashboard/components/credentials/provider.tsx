import { createContext } from 'react'

const credential = {
	isEnabled: false,
	href: '',
	label: '',
	username: '',
	password: '',
	token: ''
}

const CredentialProvider = createContext({
	jenkins: { ...credential },
	gitea: { ...credential },
	gitlab: { ...credential },
	awx: { ...credential },
	keptnBridge: { ...credential },
	keptnApi: { ...credential },
	dynatrace: { ...credential }
})

export { CredentialProvider as default }
