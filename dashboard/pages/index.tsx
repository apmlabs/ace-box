import { FunctionComponent } from 'react'
import Head from 'next/head'
import HowToComponent from '../components/how-to/index'
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

const Home: FunctionComponent<any> = ({ jenkins, gitea, gitlab, awx, keptnBridge, keptnApi, dynatrace, cloudAutomation }) =>
  <CredentialProvider.Provider value={{ jenkins, gitea, gitlab, awx, keptnBridge, keptnApi, dynatrace, cloudAutomation }}>
    <Head>
      <title>ACE Dashboard</title>
      <meta name="description" content="ACE Dashboard" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HowToComponent />
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

export { Home as default, getServerSideProps }
