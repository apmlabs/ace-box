pipeline {
	parameters {
        string(name: 'MON_APP_NAME', defaultValue: 'simplenodeservice', description: 'The name of the application to onboard.', trim: true)
        string(name: 'MON_ENDPOINT', defaultValue: 'https://dynatrace.com', description: 'The application URL for UEM.', trim: true)
        string(name: 'MON_NAMESPACE', defaultValue: 'simplenode-staging', description: 'Which kubernetes namespace is this application running in.', trim: true)
    }
    agent any
    stages {
        stage('Push') {
          steps {
            script {
                withCredentials([usernamePassword(credentialsId: 'git-creds-ace', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                    def encodedPassword = URLEncoder.encode("$GIT_PASSWORD",'UTF-8')
                    sh "git config user.email ${GITHUB_USER_EMAIL}"
                    sh "git config user.name ${GIT_USERNAME}"
					          sh "git checkout -B onboarding/${env.MON_APP_NAME}"
                    sh "mkdir -p projects/${env.MON_APP_NAME}/base"
                    sh "cp -r _template/. projects/${env.MON_APP_NAME}/base"
                    sh "find projects/${env.MON_APP_NAME}/base/ -type f -name '*.yaml'"
                    sh "find projects/${env.MON_APP_NAME}/base/ -type f -name '*.yaml' -exec sed -i 's#APPLICATION_NAME_PLACEHOLDER#${env.MON_APP_NAME}#g' {} +"
                    sh "find projects/${env.MON_APP_NAME}/base/ -type f -name '*.yaml' -exec sed -i 's#APPLICATION_URL_PLACEHOLDER#${env.MON_ENDPOINT}#g' {} +"
                    sh "find projects/${env.MON_APP_NAME}/base/ -type f -name '*.yaml' -exec sed -i 's#KUBERNETES_NAMESPACE_PLACEHOLDER#${env.MON_NAMESPACE}#g' {} +"
                    sh "find projects/${env.MON_APP_NAME}/base/ -type f -name '*.yaml' -exec sed -i 's#PROJECT_NAME_PLACEHOLDER#${env.MON_APP_NAME}#g' {} +"
                    sh "git add ."
                    sh "git commit -m 'Created config for: ${env.MON_APP_NAME}'"
                    sh "git push ${GIT_PROTOCOL}://${GIT_USERNAME}:${encodedPassword}@${GIT_DOMAIN}/${GITHUB_ORGANIZATION}/monaco.git"
                }
            }
          }
        }
    }
}