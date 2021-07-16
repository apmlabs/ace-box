import { FunctionComponent } from 'react'
import { KeptnBridgeLink, KeptnBridgeUsername, KeptnBridgePassword } from '../credentials/keptn-bridge'

type KeptnProps = {}

const Keptn: FunctionComponent<KeptnProps> = () =>
  <div>
    <p><i>Keptn</i> will play a central role in most of the use cases. Keptn is a control-plane for DevOps automation of cloud-native applications. 
    The <KeptnBridgeLink /> can be accessed using <KeptnBridgeUsername variant="inline" /> and password <KeptnBridgePassword variant="inline" />.</p>
    <p>More infos can be found on <a href="https://keptn.sh" target="_blank" rel="noreferrer">keptn.sh</a>.</p>
  </div>

export { Keptn as default }
