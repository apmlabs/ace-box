import { createContext } from 'react'

const preview = {
	href: ''
}

const PreviewProvider = createContext({
	staging: { ...preview },
	production: { ...preview },
	canary: { ...preview }
})

export { PreviewProvider as default }
