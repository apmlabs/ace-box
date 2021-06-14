const Preface = () =>
  <div>
    <h3>Preface</h3>
    <p>Welcome to your personal ACE Box! It comes with a set of already configured tools, code, pipelines, etc. to showcase a selection of cloud automation use cases.</p>
    <p>
      Before you get started, please familiarize yourself with the Dashboard you're currently looking at:
      <ul>
        <li>A <b>How-To</b> gives you step-by-step instructions for each use case.</li>
        <li>As the name indicates, <b>Deployment Preview</b> shows you the currently deployed version of a demo application up in each stage. Don't worry, the error you're seeing is fine for now as the application is not deployed yet. You will fix this as part of one the first use cases.</li>
        <li><b>Links</b> lists tools and credentials that you will need while going through the use cases.</li>
      </ul>
    </p>
    <p>
      In order to ... the following tools have bben set up and configured:
      <ul>
        <li><a href={process.env.REACT_APP_JENKINS_URL}>Jenkins</a> is installed and pre-configured with pipelines that allow...</li>
        <li><a href={process.env.REACT_APP_GITEA_URL}>Gitea</a> allows us...</li>
        <li><a href={process.env.REACT_APP_GITLAB_URL}>Gitlab</a> (optional) </li>
        <li><a href={process.env.REACT_APP_KEPTN_BRIDGE_URL}>Keptn</a> ...</li>
      </ul>
    </p>
    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro et culpa quaerat inventore pariatur impedit tempora recusandae iste nam ipsam eos explicabo eligendi dolorum saepe doloremque, similique tempore rerum ipsum.</p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur animi qui saepe incidunt reprehenderit laboriosam dolore sit assumenda illo, nisi velit dolores nobis, beatae similique et officia veritatis eligendi. Rem.</p> */}
    <p>In case you have any questions, please reach out to: ...Email / Slack / etc?... You can also find us on ...Github link... </p>
  </div>

export { Preface as default }
