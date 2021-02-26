pipeline {
	agent {
		label 'kubectl'
	}
  stages {
    stage('Set up Kubernetes') {
      steps {
        container('kubectl') {
          sh "kubectl apply -f env/namespaces.yaml"
          sh "kubectl apply -f env/maven-pvc.yaml"
        }
      }
    }
  }
}