@Library('ace@master') _ 

def tagMatchRules = [
  [
    "meTypes": [
      ["meType": "SERVICE"]
    ],
    tags : [
      ["context": "CONTEXTLESS", "key": "app", "value": "simplenodeservice"],
      ["context": "CONTEXTLESS", "key": "environment", "value": "staging"]
    ]
  ]
]

pipeline {
    parameters {
        string(name: 'APP_NAME', defaultValue: 'simplenodeservice', description: 'The name of the service to deploy.', trim: true)
    }
    agent {
        label 'kubegit'
    }
    stages {
        stage('Update production version') {
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
        stage('DT send deploy event') {
            steps {
                container("curl") {
                    script {
                        def status = pushDynatraceDeploymentEvent (
                            tagRule : tagMatchRules,
                            deploymentVersion: "${env.BUILD}",
                            customProperties : [
                                [key: 'Jenkins Build Number', value: "${env.BUILD_ID}"],
                                [key: 'Git commit', value: "${env.GIT_COMMIT}"]
                            ]
                        )
                    }
                }
            }
        }
        stage('DT create synthetic monitor') {
            steps {
                container("kubectl") {
                    script {
                        // Get IP of service
                        env.SERVICE_IP = sh(script: 'kubectl get Ingress simplenodeservice -n staging -o jsonpath=\'{.spec.rules[0].host}\'', , returnStdout: true).trim()
                    }
                }
                container("curl") {
                    script {
                        def status = dt_createUpdateSyntheticTest (
                            testName : "simpleproject.staging.${env.APP_NAME}",
                            url : "http://${SERVICE_IP}/",
                            method : "GET",
                            location : "${env.DT_SYNTHETIC_LOCATION}"
                        )
                    }
                }
            }
        }
        stage('DT create application detection rule') {
            steps {
                container("curl") {
                    script {
                        def status = dt_createUpdateAppDetectionRule (
                            dtAppName : "simpleproject.staging.${env.APP_NAME}",
                            pattern : "http://${SERVICE_IP}",
                            applicationMatchType: "CONTAINS",
                            applicationMatchTarget: "URL"
                        )
                    }
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