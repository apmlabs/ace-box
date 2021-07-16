import { FunctionComponent } from 'react'
import { DynatraceLink } from '../../components/credentials/dynatrace'

type DynatraceProps = {}

const Dynatrace: FunctionComponent<DynatraceProps> = () =>
	<div>
		<p>Your <DynatraceLink /> has been specified when the ACE Box was launched.</p>
	</div>

export { Dynatrace as default }
