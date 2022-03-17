ENVS_FILE = "monaco/environments.yaml"

pipeline {
    agent {
        label 'monaco-runner'
    }
    stages {
        stage('Dynatrace Unguard config - Clean Up') {
            steps {
                container('monaco') {
                    script {
                        sh "monaco -v -e=$ENVS_FILE monaco/cleanup"
                    }
                }
            }
        }
    }
}