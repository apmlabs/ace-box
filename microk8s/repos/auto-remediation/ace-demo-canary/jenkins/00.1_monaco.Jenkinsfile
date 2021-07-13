ENVS_FILE = "monaco/environments.yaml"

pipeline {
	agent {
		label "monaco-runner"
	}
	stages {
		stage('Dynatrace base config - Validate') {
			steps {
				container('monaco') {
					script {
						sh "monaco -v -dry-run -e=$ENVS_FILE -p=infrastructure monaco/projects"
					}
				}
			}
		}
		stage('Dynatrace base config - Deploy') {
			steps {
				container('monaco') {
					script {
						sh "monaco -v -e=$ENVS_FILE -p=infrastructure monaco/projects"
						sh "sleep 60"
					}
				}
			}
		}
		stage('Dynatrace ACE project - Validate') {
			steps {
				container('monaco') {
					script {
						sh "monaco -v -dry-run -e=$ENVS_FILE -p=ace monaco/projects"
					}
				}
			}
		}
		stage('Dynatrace ACE project - Deploy') {
			steps {
				container('monaco') {
					script {
						sh "monaco -v -e=$ENVS_FILE -p=ace monaco/projects"
					}
				}
			}
		}
	}
}
