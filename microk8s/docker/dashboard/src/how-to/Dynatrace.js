import { useDynatrace } from "../libs/credentials"

const Dynatrace = () => {
	const { Link } = useDynatrace()

	return (
		<div>
			<p>Your <Link /> has been specified when the ACE Box was launched.</p>
		</div>
	)
}

export { Dynatrace as default }
