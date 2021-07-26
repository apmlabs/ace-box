import { FunctionComponent } from 'react'

type LinkProps = {
  href: string
  label: string
}

const Link: FunctionComponent<LinkProps> = ({ href, label }) =>
	<a
		href={href}
		target="_blank"
		rel="noreferrer"
	>
		{label}
	</a>

export { Link as default }
