TENANTS_FILE = "mac/tenants.yaml"

pipeline {
    agent {
        label 'ace'
    }
    stages {
        stage('Validate configuration') {
			steps {
                container('ace') {
                    script{
                        sh "mac -v -dry-run -t=$TENANTS_FILE mac/projects"
                    }
                }
			}
		}
        stage('Deploy configuration') {
			steps {
                container('ace') {
                    script {
				        sh "mac -v -t=$TENANTS_FILE -p=ace mac/projects"
                    }
                }
			}
		}       
    }
}