import { AceBoxCredential, AceBoxCredentialInline } from "../AceBoxCredentials"

const LinkTemplate = ({ href, label }) =>
	<a
		href={href}
		target="_blank"
		rel="noreferrer"
	>
		{label}
	</a>

const useJenkins = () => {
	const href = process.env.REACT_APP_JENKINS_URL
	const isEnabled = true
	const username = process.env.REACT_APP_JENKINS_USER
	const password = process.env.REACT_APP_JENKINS_PASSWORD
	
	const Link = () =>
		<LinkTemplate
			href={href}
			label="Jenkins"
		/>

	const Username = ({ variant }) => variant === "inline"
		? <AceBoxCredentialInline
				value={username}
			/>
		: <AceBoxCredential
				name="User"
				value={username}
			/>

	const Password = ({ variant }) => variant === "inline"
		? <AceBoxCredentialInline
				type="password"
				value={password}
			/>
		: <AceBoxCredential
				name="Password"
				type="password"
				value={password}
			/>

	return {
		isEnabled,
		href,
		username,
		password,
		Link,
		Username,
		Password
	}
}

const useGitea = () => {
	const href = process.env.REACT_APP_GITEA_URL
	const isEnabled = true
	const username = process.env.REACT_APP_GITEA_USER
	const password = process.env.REACT_APP_GITEA_PASSWORD
	const token = process.env.REACT_APP_GITEA_PAT
	
	const Link = () =>
		<LinkTemplate
			href={href}
			label="Gitea"
		/>

	const Username = ({ variant }) => variant === "inline"
		? <AceBoxCredentialInline
				value={username}
			/>
		: <AceBoxCredential
				name="User"
				value={username}
			/>

	const Password = ({ variant }) => variant === "inline"
		? <AceBoxCredentialInline
				type="password"
				value={password}
			/>
		: <AceBoxCredential
				name="Password"
				type="password"
				value={password}
			/>

	const Token = ({ variant }) => variant === "inline"
		? <AceBoxCredentialInline
				type="password"
				value={token}
			/>
		: <AceBoxCredential
				name="Token"
				type="password"
				value={token}
			/>

	return {
		isEnabled,
		href,
		username,
		password,
		token,
		Link,
		Username,
		Password,
		Token
	}
}

const useGitlab = () => {
	const href = process.env.REACT_APP_GITLAB_URL
	const isEnabled = !!process.env.REACT_APP_GITLAB_URL && process.env.REACT_APP_GITLAB_URL.toLowerCase() !== "n/a" && process.env.REACT_APP_GITLAB_URL !== ""
		&& !!process.env.REACT_APP_GITLAB_USER && process.env.REACT_APP_GITLAB_USER.toLowerCase() !== "n/a" && process.env.REACT_APP_GITLAB_USER !== ""
		&& !!process.env.REACT_APP_GITLAB_PASSWORD && process.env.REACT_APP_GITLAB_PASSWORD.toLowerCase() !== "n/a" && process.env.REACT_APP_GITLAB_PASSWORD !== ""
	const username = process.env.REACT_APP_GITLAB_USER
	const password = process.env.REACT_APP_GITLAB_PASSWORD

	const Link = () =>
		<LinkTemplate
			href={href}
			label="Gitlab"
		/>

	const Username = ({ variant }) => variant === "inline"
		? <AceBoxCredentialInline
				value={username}
			/>
		: <AceBoxCredential
				name="User"
				value={username}
			/>

	const Password = ({ variant }) => variant === "inline"
		? <AceBoxCredentialInline
				type="password"
				value={password}
			/>
		: <AceBoxCredential
				name="Password"
				type="password"
				value={password}
			/>

	return {
		isEnabled,
		href,
		username,
		password,
		Link,
		Username,
		Password
	}
}

const useKeptnBridge = () => {
	const href = process.env.REACT_APP_KEPTN_BRIDGE_URL
	const isEnabled = true
	const username = process.env.REACT_APP_KEPTN_BRIDGE_USER
	const password = process.env.REACT_APP_KEPTN_BRIDGE_PASSWORD

	const Link = () =>
		<LinkTemplate
			href={href}
			label="Keptn Bridge"
		/>

	const Username = ({ variant }) => variant === "inline"
		? <AceBoxCredentialInline
				value={username}
			/>
		: <AceBoxCredential
				name="User"
				value={username}
			/>

	const Password = ({ variant }) => variant === "inline"
		? <AceBoxCredentialInline
				type="password"
				value={password}
			/>
		: <AceBoxCredential
				name="Password"
				type="password"
				value={password}
			/>

	return {
		isEnabled,
		href,
		username,
		password,
		Link,
		Username,
		Password
	}
}

const useKeptnApi = () => {
	const href = process.env.REACT_APP_KEPTN_API_URL
	const isEnabled = true
	const token = process.env.REACT_APP_KEPTN_API_TOKEN

	const Link = () =>
		<LinkTemplate
			href={href}
			label="Keptn API"
		/>

	const Token = ({ variant }) => variant === "inline"
		? <AceBoxCredentialInline
				type="password"
				value={token}
			/>
		: <AceBoxCredential
				name="Token"
				type="password"
				value={token}
			/>

	return {
		isEnabled,
		href,
		token,
		Link,
		Token
	}
}

const useDynatrace = () => {
	const href = process.env.REACT_APP_DT_TENANT_URL
	const isEnabled = true

	const Link = () =>
		<LinkTemplate
			href={href}
			label="Dynatrace Tenant"
		/>

	return {
		isEnabled,
		href,
		Link
	}
}

const useLinks = () => {
	const { href: jenkinsHref, Link: JenkinsLink } = useJenkins()
	const { href: giteaHref, Link: GiteaLink } = useGitea()
	const { href: gitlabHref, Link: GitlabLink } = useGitlab()
	const { href: keptnBridgeHref, Link: KeptnBridgeLink } = useKeptnBridge()
	const { href: keptnApiHref, Link: KeptnApiLink } = useKeptnApi()
	const { href: dynatraceHref } = useDynatrace()

	const hrefs = {
		jenkins: jenkinsHref,
		gitea: giteaHref,
		gitlab: gitlabHref,
		keptnBridge: keptnBridgeHref,
		keptnApi: keptnApiHref,
		dynatrace: dynatraceHref
	}

	return {
		hrefs,
		JenkinsLink,
		GiteaLink,
		GitlabLink,
		KeptnBridgeLink,
		KeptnApiLink
	}
}

export { useLinks as default, useJenkins, useGitea, useGitlab, useKeptnBridge, useKeptnApi, useDynatrace }
