import { useJenkins } from "../libs/credentials"

const Jenkins = () => {
  const { Link, Username, Password } = useJenkins()

  return (
    <div>
      <p><Link /> is our go-to CI/CD tool. You can log in using <Username variant="inline" /> and password <Password variant="inline"  />.
      Our installation comes with a couple of pre-installed plugins and projects which allow us to run through use cases without further configuration. 
      Please find more info about use cases below.
      </p>
    </div>
  )
}

export { Jenkins as default }
