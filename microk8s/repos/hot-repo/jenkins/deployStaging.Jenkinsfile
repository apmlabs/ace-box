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

def mzContitions = [
    [
        key: [ attribute: 'SERVICE_TAGS' ],
        comparisonInfo: [ type: 'TAG', operator: 'EQUALS',
            value: [ context: 'CONTEXTLESS', key: 'project', value: 'simpleproject' ],
            negate: false
        ]
    ],
    [
        key: [ attribute: 'PROCESS_GROUP_PREDEFINED_METADATA', dynamicKey: 'KUBERNETES_NAMESPACE', type: 'PROCESS_PREDEFINED_METADATA_KEY' ],
        comparisonInfo: [ type: 'STRING', operator: 'EQUALS', value: 'staging', negate: false, caseSensitive: false ]
    ]
]

def dashboardTileRules = [
    [
        name : 'Service health', tileType : 'SERVICES', configured : true, filterConfig: null, chartVisible: true,
        bounds : [ top: 38, left : 0, width: 304, height: 304 ],
        tileFilter : [ timeframe : null, managementZone : null ]
            
    ],
    [
        name : 'Custom chart', tileType : 'CUSTOM_CHARTING', configured : true, chartVisible: true,
        bounds : [ top: 38, left : 342, width: 494, height: 304 ],
        tileFilter : [ timeframe : null, managementZone : null ],
        filterConfig : [ type : 'MIXED', customName: 'Response time', defaultName: 'Custom chart', 
            chartConfig : [
                legendShown : true, type : 'TIMESERIES', resultMetadata : [:],
                series : [
                    [ metric: 'builtin:service.response.time', aggregation: 'AVG', percentile: null, type : 'BAR', entityType : 'SERVICE', dimensions : [], sortAscending : false, sortColumn : true, aggregationRate : 'TOTAL' ]
                ],
            ],
        filtersPerEntityType: [:]
        ]
    ],
    [
        name : 'Custom chart', tileType : 'CUSTOM_CHARTING', configured : true, chartVisible: true,
        bounds : [ top: 38, left : 874, width: 494, height: 304 ],
        tileFilter : [ timeframe : null, managementZone : null ],
        filterConfig : [ type : 'MIXED', customName: 'Failure rate (any  errors)', defaultName: 'Custom chart', 
            chartConfig : [
                legendShown : true, type : 'TIMESERIES', resultMetadata : [:],
                series : [
                    [ metric: 'builtin:service.errors.total.rate', aggregation: 'AVG', percentile: null, type : 'BAR', entityType : 'SERVICE', dimensions : [], sortAscending : false, sortColumn : true, aggregationRate : 'TOTAL' ]
                ],
            ],
        filtersPerEntityType: [:]
        ]
    ]
]

pipeline {
    parameters {
        string(name: 'APP_NAME', defaultValue: 'simplenodeservice', description: 'The name of the service to deploy.', trim: true)
        string(name: 'TAG_STAGING', defaultValue: '', description: 'The image of the service to deploy.', trim: true)
        string(name: 'BUILD', defaultValue: '', description: 'The version of the service to deploy.', trim: true)
    }
    agent {
        label 'kubegit'
    }
    stages {
        stage('Update spec') {
            steps {
                script {
                    env.DT_CUSTOM_PROP = readMetaData() + " " + generateDynamicMetaData()
                    env.DT_TAGS = readTags()
                }
                container('git') {
                    withCredentials([usernamePassword(credentialsId: 'git-creds-ace', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                        sh "git config --global user.email ${env.GITHUB_USER_EMAIL}"
                        sh "git clone ${env.GIT_PROTOCOL}://${GIT_USERNAME}:${GIT_PASSWORD}@${env.GIT_DOMAIN}/${env.GITHUB_ORGANIZATION}/${env.GIT_REPO}"
                        sh "cd ${env.GIT_REPO}/ && sed 's#value: \"DT_CUSTOM_PROP_PLACEHOLDER\".*#value: \"${env.DT_CUSTOM_PROP}\"#' manifests/${env.APP_NAME}.yml > manifests/staging/${env.APP_NAME}.yml"
                        sh "cd ${env.GIT_REPO}/ && sed -i 's#value: \"DT_TAGS_PLACEHOLDER\".*#value: \"${env.DT_TAGS}\"#' manifests/staging/${env.APP_NAME}.yml"
                        sh "cd ${env.GIT_REPO}/ && sed -i 's#value: \"NAMESPACE_PLACEHOLDER\".*#value: \"staging\"#' manifests/staging/${env.APP_NAME}.yml"
                        sh "cd ${env.GIT_REPO}/ && sed -i 's#image: .*#image: ${env.TAG_STAGING}#' manifests/staging/${env.APP_NAME}.yml"
                        sh "cd ${env.GIT_REPO}/ && git add manifests/staging/${env.APP_NAME}.yml && git commit -m 'Update ${env.APP_NAME} version ${env.BUILD}'"
                        sh "cd ${env.GIT_REPO}/ && git push ${env.GIT_PROTOCOL}://${GIT_USERNAME}:${GIT_PASSWORD}@${env.GIT_DOMAIN}/${env.GITHUB_ORGANIZATION}/${env.GIT_REPO}"
                        sh "rm -rf ${env.GIT_REPO}"
                    }
                }
            }
        }     
        stage('Deploy to staging') {
            steps {
                checkout scm
                container('kubectl') {
                    sh "kubectl -n staging apply -f manifests/staging/${env.APP_NAME}.yml"
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
        /*stage('DT create synthetic monitor') {
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
                            url : "http://${SERVICE_IP}/api/invoke?url=https://www.dynatrace.com",
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
		stage('DT create management zone') {
          steps {
            container("curl") {
              script {
                def (int status, String dt_mngtZoneId) = dt_createUpdateManagementZone (
                    managementZoneName : 'SimpleProject Staging',
                    ruleType : 'SERVICE',
                    managementZoneConditions : mzContitions,
                )
                DT_MGMTZONEID = dt_mngtZoneId
              }
            }
          }
        }
		stage('DT create dashboard') {
          steps {
            container("curl") {
              script {
                def status = dt_createUpdateDashboard (
                  dashboardName : 'simpleproject-staging',
                  dashboardManagementZoneName : 'SimpleProject Staging',
                  dashboardManagementZoneId : "${DT_MGMTZONEID}",
                  dashboardShared : true,
                  dashboardLinkShared : true,
                  dashboardPublished : true,
                  dashboardTimeframe : '-30m',
                  dtDashboardTiles : dashboardTileRules
                )
              }
            }
         }
       }*/
        stage('Run tests') {
            steps {
                build job: "3. Test",
                wait: false,
                parameters: [
                    string(name: 'APP_NAME', value: "${env.APP_NAME}")
                ]
            }
        }  
    }
}

def generateDynamicMetaData(){
    String returnValue = "";
    returnValue += "SCM=${env.GIT_URL} "
    returnValue += "Branch=${env.GIT_BRANCH} "
    returnValue += "Build=${env.BUILD} "
    returnValue += "Image=${env.TAG_STAGING} "
    returnValue += "keptn_project=simplenodeproject "
    returnValue += "keptn_service=${env.APP_NAME} "
    returnValue += "keptn_stage=staging "
    return returnValue;
}

def readMetaData() {
    def conf = readYaml file: "manifests/staging/dt_meta.yaml"

    def return_meta = ""
    for (meta_entry in conf.metadata) {
        if (meta_entry.key != null &&  meta_entry.key != "") {
            def curr_meta = ""
            curr_meta = meta_entry.key.replace(" ", "_")
            if (meta_entry.value != null &&  meta_entry.value != "") {
                curr_meta += "="
                curr_meta += meta_entry.value.replace(" ", "_")
            }
            echo curr_meta
            return_meta += curr_meta + " "
        }
    }
    return return_meta
}

def readTags() {
    def conf = readYaml file: "manifests/staging/dt_meta.yaml"

    def return_tag = ""
    for (tag_entry in conf.tags) {
        if (tag_entry.key != null &&  tag_entry.key != "") {
            def curr_tag = ""
            curr_tag = tag_entry.key.replace(" ", "_")
            if (tag_entry.value != null &&  tag_entry.value != "") {
                curr_tag += "="
                curr_tag += tag_entry.value.replace(" ", "_")
            }
            echo curr_tag
            return_tag += curr_tag + " "
        }
    }
    echo return_tag
    return return_tag
}