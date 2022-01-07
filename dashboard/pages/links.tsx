import { FunctionComponent } from 'react'
import Head from 'next/head'
import LinksComponent from '../components/links/index'
import CredentialProvider from '../components/credentials/provider'

import {
  getJenkinsCredentials,
	getGiteaCredentials,
	getGitlabCredentials,
	getAwxCredentials,
	getKeptnBridgeCredentials,
	getKeptnApiCredentials,
	getDynatraceCredentials,
  getCloudAutomationCredentials
} from '../libs/credentials'

const Links: FunctionComponent<any> = ({ jenkins, gitea, gitlab, awx, keptnBridge, keptnApi, dynatrace, cloudAutomation }) =>
  <CredentialProvider.Provider value={{ jenkins, gitea, gitlab, awx, keptnBridge, keptnApi, dynatrace, cloudAutomation }}>
    <Head>
      <title>ACE Dashboard - Links</title>
      <meta name="description" content="ACE Dashboard" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <LinksComponent />
  </CredentialProvider.Provider>

const getServerSideProps = async () => {
  const jenkins = getJenkinsCredentials()
  const gitea = getGiteaCredentials()
	const gitlab = getGitlabCredentials()
	const awx = getAwxCredentials()
	const keptnBridge = getKeptnBridgeCredentials()
	const keptnApi = getKeptnApiCredentials()
	const dynatrace = getDynatraceCredentials()
  const cloudAutomation = getCloudAutomationCredentials()

  return {
    props: {
      jenkins,
      gitea,
      gitlab,
      awx,
      keptnBridge,
      keptnApi,
      dynatrace,
      cloudAutomation
    }
  }
}

export { Links as default, getServerSideProps }
