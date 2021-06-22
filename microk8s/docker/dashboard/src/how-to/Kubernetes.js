const Kubernetes = () =>
  <div>
    <p>
      Not only the services which will be deployed as part of the use cases but also all tools (e.g. <i>Jenkins</i>, <i>Gitea</i>, ...) are running on <i>MicroK8s</i>. <i>MicroK8s</i> has been installed with a few addons, most importantly a registry. This local registry will be used during some use cases to push and pull container images.
    </p>
    <p>
      <i>kubectl</i> is available on the host machine.
    </p>
  </div>

export { Kubernetes as default }
