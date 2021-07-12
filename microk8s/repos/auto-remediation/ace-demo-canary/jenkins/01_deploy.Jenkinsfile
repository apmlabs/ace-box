@Library('ace@v1.1') ace 
def event = new com.dynatrace.ace.Event()

pipeline {
	parameters {
		string(name: 'IMAGE_NAME', defaultValue: 'ace/simplenodeservice', description: 'The image name of the service to deploy.', trim: true)
		string(name: 'IMAGE_TAG', defaultValue: '1.0.3', description: 'The image tag of the service to deploy.', trim: true)
		string(name: 'CANARY_WEIGHT', defaultValue: '0', description: 'Weight of traffic that will be routed to service.', trim: true)
		booleanParam(name: 'IS_CANARY', defaultValue: false, description: 'Is canary version of service.')
	}
	environment {
		APP_NAME = "simplenodeservice-canary"
		CANARY_VERSION = "${params.IS_CANARY ? 'v2' : 'v1'}"
		RELEASE_NAME = "${env.APP_NAME}-${env.CANARY_VERSION}"
		NAMESPACE = "canary"
		APPLICATION_BUILD_VERSION = "${params.IMAGE_TAG}"
		IMAGE_FULL = "${env.DOCKER_REGISTRY_URL}/${params.IMAGE_NAME}:${params.IMAGE_TAG}"
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
		// stage('Generate meta') {
		// 	steps {
		// 		script {
		// 			// env.APPLICATION_BUILD_VERSION = sh(returnStdout: true, script: "echo ${params.IMAGE_TAG} | cut -c1-5 | tr -d '\n'")
		// 			env.VERSION = sh(returnStdout: true, script: "echo ${params.IMAGE_TAG} | cut -c1-5 | tr -d '\n'")
		// 		}
		// 	}
		// }  
		stage('Deploy via Helm') {
			steps {
				checkout scm
				container('helm') {
					sh "helm upgrade --install ${env.RELEASE_NAME} helm/simplenodeservice \
					--set image=${env.IMAGE_FULL} \
					--set domain=${env.INGRESS_DOMAIN} \
					--set version=${env.CANARY_VERSION} \
					--set build_version=${params.IMAGE_TAG} \
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
					sleep(time:120,unit:"SECONDS")
		
					def status = event.pushDynatraceDeploymentEvent (
						tagRule: generateTagRules(),
						deploymentName: "${env.RELEASE_NAME} deployed",
						deploymentVersion: "${env.CANARY_VERSION}",
						deploymentProject: "simplenode-app",
						customProperties : [
							"Jenkins Build Number": "${params.IMAGE_TAG}",
							"Approved by": "ACE"
						]
					)
				}
			}
		}      
	}
}

def generateTagRules() {
	def tagMatchRules = [
		[
			"meTypes": [ "PROCESS_GROUP_INSTANCE" ],
			tags: [
				["context": "ENVIRONMENT", "key": "DT_APPLICATION_BUILD_VERSION", "value": "${env.APPLICATION_BUILD_VERSION}"],
				["context": "KUBERNETES", "key": "app.kubernetes.io/name", "value": "simplenodeservice"],
				["context": "KUBERNETES", "key": "app.kubernetes.io/part-of", "value": "simplenode-app"],
				["context": "KUBERNETES", "key": "app.kubernetes.io/component", "value": "api"],
				["context": "CONTEXTLESS", "key": "environment", "value": "${env.NAMESPACE}"]
			]
		]
	]

	return tagMatchRules
}

// def generateTagRules() {
// 	def tagMatchRules = [
// 		[
// 			"meTypes": [ "PROCESS_GROUP_INSTANCE"],
// 			tags: [
// 				["context": "KUBERNETES", "key": "app.kubernetes.io/version", "value": "${env.VERSION}"],
// 				["context": "KUBERNETES", "key": "app.kubernetes.io/name", "value": "simplenodeservice"],
// 				["context": "KUBERNETES", "key": "app.kubernetes.io/part-of", "value": "simplenode-app"],
// 				["context": "KUBERNETES", "key": "app.kubernetes.io/component", "value": "api"],
// 				["context": "CONTEXTLESS", "key": "environment", "value": "${env.NAMESPACE}"]
// 			]
// 		]
// 	]

// 	return tagMatchRules
// }

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