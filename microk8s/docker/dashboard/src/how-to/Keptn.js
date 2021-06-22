import { useKeptnBridge } from "../libs/credentials"

const Keptn = () => {
  const { Link, Username, Password } = useKeptnBridge()

  return (
    <div>
      <p><i>Keptn</i> will play a central role in most of the use cases. Keptn is a control-plane for DevOps automation of cloud-native applications. 
      The <Link /> can be accessed using <Username variant="inline" /> and password <Password variant="inline" />.</p>
      <p>More infos can be found on <a href="https://keptn.sh" target="_blank" rel="noreferrer">keptn.sh</a>.</p>
    </div>
  )
}

export { Keptn as default }
