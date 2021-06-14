const hrefs = {
	jenkins: process.env.REACT_APP_JENKINS_URL,
	gitea: process.env.REACT_APP_GITEA_URL,
	gitlab: process.env.REACT_APP_GITLAB_URL,
	keptnBridge: process.env.REACT_APP_KEPTN_BRIDGE_URL,
	keptnApi: process.env.REACT_APP_KEPTN_API_URL
}

const DefaultLink = ({ href, label }) =>
	<a href={href}>{label}</a>

const DefaultUsername = ({ value }) =>
	<span>{value}</span>

const DefaultPassword = ({ value }) =>
	<span>{value}</span>

const JenkinsLink = () =>
	<DefaultLink
		href={hrefs.jenkins}
		label="Jenkins"
	/>

const GiteaLink = () =>
	<DefaultLink
		href={hrefs.gitea}
		label="Gitea"
	/>

const GitlabLink = () =>
	<DefaultLink
		href={hrefs.gitlab}
		label="Gitlab"
	/>

const KeptnBridgeLink = () =>
	<DefaultLink
		href={hrefs.keptnBridge}
		label="Keptn Bridge"
	/>

const KeptnApiLink = () =>
	<DefaultLink
		href={hrefs.keptnApi}
		label="Keptn API"
	/>

const useLinks = () => {
	return {
		hrefs,
		JenkinsLink,
		GiteaLink,
		GitlabLink,
		KeptnBridgeLink,
		KeptnApiLink
	}
}

const useJenkins = () => {
	const Link = () =>
		<DefaultLink
			href={hrefs.jenkins}
			label="Jenkins"
		/>

	const Username = () =>
		<DefaultUsername value={process.env.REACT_APP_JENKINS_USER} />

	const Password = () =>
		<DefaultPassword value={process.env.REACT_APP_JENKINS_PASSWORD} />

	return {
		href: hrefs.jenkins,
		Link,
		Username,
		Password
	}
}

export { useLinks as default, useJenkins }
