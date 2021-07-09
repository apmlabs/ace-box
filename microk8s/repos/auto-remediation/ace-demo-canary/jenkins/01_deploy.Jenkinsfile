@Library('ace@v1.1') ace 
def event = new com.dynatrace.ace.Event()

pipeline {
	parameters {
		string(name: 'IMAGE_NAME', defaultValue: 'ace/simplenodeservice', description: 'The image name of the service to deploy.', trim: true)
		string(name: 'IMAGE_TAG', defaultValue: '', description: 'The image tag of the service to deploy.', trim: true)
		string(name: 'CANARY_WEIGHT', defaultValue: '0', description: 'Weight of traffic that will be routed to service.', trim: true)
		booleanParam(name: 'IS_CANARY', defaultValue: false, description: 'Is canary version of service.')
	}
	environment {
		IMAGE_FULL = "${env.DOCKER_REGISTRY_URL}/${params.IMAGE_NAME}:${params.IMAGE_TAG}"
		APP_NAME = "simplenodeservice-canary"
		RELEASE_NAME = "${env.APP_NAME}-${params.IS_CANARY ? 'green' : 'blue'}"
		NAMESPACE = "canary"
		APPLICATION_BUILD_VERSION = "${params.IMAGE_TAG}"
	}
	agent {
		label 'kubegit'
	}
	stages {
		// stage('Update spec') {
		//     steps {
		//         script {
		//             env.DT_CUSTOM_PROP = readMetaData() + " " + generateDynamicMetaData()
		//             env.DT_TAGS = readTags()
		//         }
		//         container('git') {
		//             withCredentials([usernamePassword(credentialsId: 'git-creds-ace', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
		//                 sh "git config --global user.email ${env.GITHUB_USER_EMAIL}"
		//                 sh "git clone ${env.GIT_PROTOCOL}://${GIT_USERNAME}:${GIT_PASSWORD}@${env.GIT_DOMAIN}/${env.GITHUB_ORGANIZATION}/${env.GIT_REPO}"
		//                 sh "cd ${env.GIT_REPO}/ && sed 's#value: \"DT_CUSTOM_PROP_PLACEHOLDER\".*#value: \"${env.DT_CUSTOM_PROP}\"#' manifests/${env.APP_NAME}.yml > manifests/staging/${env.APP_NAME}.yml"
		//                 sh "cd ${env.GIT_REPO}/ && sed -i 's#value: \"DT_TAGS_PLACEHOLDER\".*#value: \"${env.DT_TAGS}\"#' manifests/staging/${env.APP_NAME}.yml"
		//                 sh "cd ${env.GIT_REPO}/ && sed -i 's#value: \"NAMESPACE_PLACEHOLDER\".*#value: \"staging\"#' manifests/staging/${env.APP_NAME}.yml"
		//                 sh "cd ${env.GIT_REPO}/ && sed -i 's#image: .*#image: ${env.TAG_STAGING}#' manifests/staging/${env.APP_NAME}.yml"
		//                 sh "cd ${env.GIT_REPO}/ && git add manifests/staging/${env.APP_NAME}.yml && git commit -m 'Update ${env.APP_NAME} version ${env.BUILD}'"
		//                 sh "cd ${env.GIT_REPO}/ && git push ${env.GIT_PROTOCOL}://${GIT_USERNAME}:${GIT_PASSWORD}@${env.GIT_DOMAIN}/${env.GITHUB_ORGANIZATION}/${env.GIT_REPO}"
		//                 sh "rm -rf ${env.GIT_REPO}"
		//             }
		//         }
		//     }
		// }    
		stage('Generate meta') {
			steps {
				script {
					// env.APPLICATION_BUILD_VERSION = sh(returnStdout: true, script: "echo ${params.IMAGE_TAG} | cut -c1-5 | tr -d '\n'")
					env.VERSION = sh(returnStdout: true, script: "echo ${params.IMAGE_TAG} | cut -c1-5 | tr -d '\n'")
				}
			}
		}  
		stage('Deploy via Helm') {
			steps {
				checkout scm
				container('helm') {
					// sh "sed -e \"s|DOMAIN_PLACEHOLDER|${env.INGRESS_DOMAIN}|\" -e \"s|ENVIRONMENT_PLACEHOLDER|staging|\" -e \"s|IMAGE_PLACEHOLDER|${env.TAG_STAGING}|\" -e \"s|VERSION_PLACEHOLDER|${env.BUILD}.0.0|\" -e \"s|BUILD_VERSION_PLACEHOLDER|${env.ART_VERSION}|\" -e \"s|DT_TAGS_PLACEHOLDER|${env.DT_TAGS}|\" -e \"s|DT_CUSTOM_PROP_PLACEHOLDER|${env.DT_CUSTOM_PROP}|\" helm/simplenodeservice/values.yaml > helm/simplenodeservice/values-gen.yaml"
					sh "helm upgrade --install ${env.RELEASE_NAME} helm/simplenodeservice \
					--set image=${env.IMAGE_FULL} \
					--set domain=${env.INGRESS_DOMAIN} \
					--set version=${env.VERSION} \
					--set build_version=${env.APPLICATION_BUILD_VERSION} \
					--set isCanary=${params.IS_CANARY} \
					--set canaryWeight=${params.CANARY_WEIGHT} \
					--namespace ${env.NAMESPACE} --create-namespace \
					--wait"
				}
			}
		}
		stage('Dynatrace deployment event') {
			steps {
				script {
					// sleep(time:120,unit:"SECONDS")
		
					def status = event.pushDynatraceDeploymentEvent (
						tagRule: generateTagRules(),
						deploymentName: "${env.APP_NAME} ${params.IMAGE_TAG} deployed",
						deploymentVersion: "${env.VERSION}",
						deploymentProject: "simplenode-app",
						customProperties : [
							"Jenkins Build Number": "${env.APPLICATION_BUILD_VERSION}",
							"Approved by": "ACE"
						]
					)
				}
			}
		}

		// build_version: BUILD_VERSION_PLACEHOLDER = ${env.ART_VERSION} = ${env.BUILD}.0.0-${env.V_TAG} w/ V_TAG = sh(returnStdout: true, script: "echo ${env.GIT_COMMIT} | cut -c1-6 | tr -d '\n'")
		// version: VERSION_PLACEHOLDER = ${env.BUILD}.0.0
		// dt_tags: DT_TAGS_PLACEHOLDER
		// dt_custom_prop: DT_CUSTOM_PROP_PLACEHOLDER

		// stage('Launch tests') {
		//     steps {
		//         build job: "ace-demo/3. Test",
		//         wait: false,
		//         parameters: [
		//             string(name: 'APP_NAME', value: "${env.APP_NAME}"),
		//             string(name: 'BUILD', value: "${env.BUILD}"),
		//             string(name: 'ART_VERSION', value: "${env.ART_VERSION}")
		//         ]
		//     }
		// }         
	}
}

// def generateTagRules() {
// 	def tagMatchRules = [
// 		[
// 			"meTypes": [ "PROCESS_GROUP_INSTANCE"],
// 			tags: [
// 				["context": "CONTEXTLESS", "key": "environment", "value": "${env.NAMESPACE}"],
// 				["context": "CONTEXTLESS", "key": "app", "value": "simplenodeservice"]
// 			]
// 		]
// 	]

// 	return tagMatchRules
// }

def generateTagRules() {
	def tagMatchRules = [
		[
			"meTypes": [ "PROCESS_GROUP_INSTANCE"],
			tags: [
				["context": "KUBERNETES", "key": "app.kubernetes.io/version", "value": "${env.VERSION}"],
				["context": "KUBERNETES", "key": "app.kubernetes.io/name", "value": "simplenodeservice"],
				["context": "KUBERNETES", "key": "app.kubernetes.io/part-of", "value": "simplenode-app"],
				["context": "KUBERNETES", "key": "app.kubernetes.io/component", "value": "api"],
				["context": "CONTEXTLESS", "key": "environment", "value": "${env.NAMESPACE}"]
			]
		]
	]

	return tagMatchRules
}

// def generateDynamicMetaData(){
//     String returnValue = "";
//     returnValue += "SCM=${env.GIT_URL} "
//     returnValue += "Branch=${env.GIT_BRANCH} "
//     returnValue += "Build=${env.BUILD} "
//     returnValue += "Image=${env.TAG_STAGING} "
//     returnValue += "keptn_project=simplenodeproject "
//     returnValue += "keptn_service=${env.APP_NAME} "
//     returnValue += "keptn_stage=staging "
//     returnValue += "url=simplenode.staging.${env.INGRESS_DOMAIN}"
//     return returnValue;
// }

// def readMetaData() {
//     def conf = readYaml file: "manifests/staging/dt_meta.yaml"

//     def return_meta = ""
//     for (meta_entry in conf.metadata) {
//         if (meta_entry.key != null &&  meta_entry.key != "") {
//             def curr_meta = ""
//             curr_meta = meta_entry.key.replace(" ", "_")
//             if (meta_entry.value != null &&  meta_entry.value != "") {
//                 curr_meta += "="
//                 curr_meta += meta_entry.value.replace(" ", "_")
//             }
//             echo curr_meta
//             return_meta += curr_meta + " "
//         }
//     }
//     return return_meta
// }

// def readTags() {
//     def conf = readYaml file: "manifests/staging/dt_meta.yaml"

//     def return_tag = ""
//     for (tag_entry in conf.tags) {
//         if (tag_entry.key != null &&  tag_entry.key != "") {
//             def curr_tag = ""
//             curr_tag = tag_entry.key.replace(" ", "_")
//             if (tag_entry.value != null &&  tag_entry.value != "") {
//                 curr_tag += "="
//                 curr_tag += tag_entry.value.replace(" ", "_")
//             }
//             echo curr_tag
//             return_tag += curr_tag + " "
//         }
//     }
//     echo return_tag
//     return return_tag
// }