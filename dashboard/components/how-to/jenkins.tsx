import { FunctionComponent } from 'react'
import { JenkinsLink, JenkinsUsername, JenkinsPassword } from '../../components/credentials/jenkins'

type JenkinsProps = {}

const Jenkins: FunctionComponent<JenkinsProps> = () =>
  <div>
    <p><JenkinsLink /> is our go-to CI/CD tool. You can log in using <JenkinsUsername variant="inline" /> and password <JenkinsPassword variant="inline"  />.
    Our installation comes with a couple of pre-installed plugins and projects which allow us to run through use cases without further configuration. 
    Please find more info about use cases below.
    </p>
  </div>

export { Jenkins as default }
