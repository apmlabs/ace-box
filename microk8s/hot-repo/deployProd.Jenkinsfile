pipeline {
    parameters {
        string(name: 'APP_NAME', defaultValue: 'simplenodeservice', description: 'The name of the service to deploy.', trim: true)
    }
    agent {
        label 'kubegit'
    }
    stages {
        stage('Update production versions with latest versions from staging') {
            steps {
                script {
                    env.DT_CUSTOM_PROP = readFile "manifests/production/dt_meta" 
                    env.DT_CUSTOM_PROP = env.DT_CUSTOM_PROP + " " + generateMetaData()
                }
                container('kubectl') {
                    sh "sed 's#value: \"DT_CUSTOM_PROP_PLACEHOLDER\".*#value: \"${env.DT_CUSTOM_PROP}\"#' manifests/${env.APP_NAME}.yml > manifests/production/${env.APP_NAME}.yml"
                    sh "sed -i \"s#image: .*#image: `kubectl -n staging get deployment -o jsonpath='{.items[*].spec.template.spec.containers[0].image}' --field-selector=metadata.name=${env.APP_NAME}`#\" manifests/production/${env.APP_NAME}.yml"
                    sh "sed -i \"s#nodePort: .*#nodePort: 31600#\" manifests/production/${env.APP_NAME}.yml"
                    sh "cat manifests/production/${env.APP_NAME}.yml"
                    sh "kubectl -n production apply -f manifests/production/${env.APP_NAME}.yml"
                }
            }
        }
    }
}

def generateMetaData(){
    String returnValue = "";
    returnValue += "SCM=${env.GIT_URL} "
    returnValue += "Branch=${env.GIT_BRANCH} "
    returnValue += "Build=${env.BUILD} "
    return returnValue;
}