@Library('ace@master') _ 

def tagMatchRules = [
  [
    "meTypes": [
      ["meType": "SERVICE"]
    ],
    tags : [
      ["context": "CONTEXTLESS", "key": "app", "value": "simplenodeservice"],
      ["context": "CONTEXTLESS", "key": "environment", "value": "production"]
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
        comparisonInfo: [ type: 'STRING', operator: 'EQUALS', value: 'production', negate: false, caseSensitive: false ]
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
    }
    agent {
        label 'kubegit'
    }
    stages {
        stage('Update production version') {
            steps {
                script {
                    env.DT_CUSTOM_PROP = readMetaData() + " " + generateDynamicMetaData()
                    env.DT_TAGS = readTags()
                }
                container('kubectl') {
                    sh "sed 's#value: \"DT_CUSTOM_PROP_PLACEHOLDER\".*#value: \"${env.DT_CUSTOM_PROP}\"#' manifests/${env.APP_NAME}.yml > manifests/production/${env.APP_NAME}.yml"
                    sh "sed -i 's#value: \"DT_TAGS_PLACEHOLDER\".*#value: \"${env.DT_TAGS}\"#' manifests/production/${env.APP_NAME}.yml"
                    sh "sed -i 's#value: \"NAMESPACE_PLACEHOLDER\".*#value: \"production\"#' manifests/production/${env.APP_NAME}.yml"
                    sh "sed -i \"s#image: .*#image: `kubectl -n staging get deployment -o jsonpath='{.items[*].spec.template.spec.containers[0].image}' --field-selector=metadata.name=${env.APP_NAME}`#\" manifests/production/${env.APP_NAME}.yml"
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
                        env.SERVICE_IP = sh(script: 'kubectl get Ingress simplenodeservice -n production -o jsonpath=\'{.spec.rules[0].host}\'', , returnStdout: true).trim()
                    }
                }
                container("curl") {
                    script {
                        def status = dt_createUpdateSyntheticTest (
                            testName : "simpleproject.production.${env.APP_NAME}",
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
                            dtAppName : "simpleproject.production.${env.APP_NAME}",
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
                    managementZoneName : 'SimpleProject Production',
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
                  dashboardName : 'simpleproject-production',
                  dashboardManagementZoneName : 'SimpleProject Production',
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
       }
    }
}

def generateDynamicMetaData(){
    String returnValue = "";
    returnValue += "SCM=${env.GIT_URL} "
    returnValue += "Branch=${env.GIT_BRANCH} "
    returnValue += "Build=${env.BUILD} "
    returnValue += "Image=${env.TAG_STAGING} "
    //returnValue += "keptn_project=simplenodeproject "
    //returnValue += "keptn_service=${env.APP_NAME} "
    //returnValue += "keptn_stage=staging "
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