pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                sh "chmod +x load-gen/run.sh"
                sh "cd load-gen && ./run.sh ${env.INGRESS_DOMAIN}"
            }
        }
    }
}