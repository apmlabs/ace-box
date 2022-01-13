import { FunctionComponent } from 'react'
import { CloudAutomationLink } from '../../components/credentials/cloudautomation'

type CloudAutomationProps = {}

const CloudAutomation: FunctionComponent<CloudAutomationProps> = () =>
	<div>
		<p>Your <CloudAutomationLink /> has been specified when the ACE Box was launched.</p>
	</div>

export { CloudAutomation as default }
