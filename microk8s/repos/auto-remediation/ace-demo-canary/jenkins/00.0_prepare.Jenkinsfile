pipeline {
	environment {
		APP_NAME = "simplenodeservice"
		ARTEFACT_ID = "ace/" + "${env.APP_NAME}"
	}
	agent {
		label 'nodejs'
	}
	stages {
		stage('Build and push') {
			parallel {
				stage('Build 1') {
					environment {
						BUILD = "1"
						IMAGE_NAME = "${env.ARTEFACT_ID}"
						IMAGE_TAG = "${env.BUILD}.0.0-${env.GIT_COMMIT}"
						IMAGE_FULL = "${env.DOCKER_REGISTRY_URL}/${env.IMAGE_NAME}:${env.IMAGE_TAG}"
					}
					stages {
						stage('Node build') {
							steps {
								checkout scm
								container('nodejs') {
									sh 'npm install'
								}
							}
						} 
						stage('Docker build') {
							steps {
								container('docker') {
									sh "docker build --build-arg BUILD_NUMBER=${env.BUILD} -t ${env.IMAGE_FULL} ."
								}
							}
						}
						stage('Docker push') {
							steps {
								container('docker') {
									sh "docker push ${env.IMAGE_FULL}"
								}
							}
						}
						stage('Deploy good build'){
							steps {
								build job: "ace-demo-canary/1. Deploy",
								wait: false,
								parameters: [
									string(name: 'IMAGE_NAME', value: "${env.IMAGE_NAME}"),
									string(name: 'IMAGE_TAG', value: "${env.IMAGE_TAG}")
								]
							}
						}
					}
				}
				stage('Build 2') {
					environment {
						BUILD = "2"
						IMAGE_NAME = "${env.ARTEFACT_ID}"
						IMAGE_TAG = "${env.BUILD}.0.0-${env.GIT_COMMIT}"
						IMAGE_FULL = "${env.DOCKER_REGISTRY_URL}/${env.IMAGE_NAME}:${env.IMAGE_TAG}"
					}
					stages {
						stage('Node build') {
							steps {
								checkout scm
								container('nodejs') {
									sh 'npm install'
								}
							}
						} 
						stage('Docker build') {
							steps {
								container('docker') {
									sh "docker build --build-arg BUILD_NUMBER=${env.BUILD} -t ${env.IMAGE_FULL} ."
								}
							}
						}
						stage('Docker push') {
							steps {
								container('docker') {
									sh "docker push ${env.IMAGE_FULL}"
								}
							}
						}
						stage('Deploy faulty build'){
							steps {
								build job: "ace-demo-canary/1. Deploy",
								wait: false,
								parameters: [
									string(name: 'IMAGE_NAME', value: "${env.IMAGE_NAME}"),
									string(name: 'IMAGE_TAG', value: "${env.IMAGE_TAG}"),
									booleanParam(name: 'IS_CANARY', value: true),
									string(name: 'CANARY_WEIGHT', value: "0")
								]
							}
						}
					}
				}
			}
		}
		stage('Monaco') {
			steps {
				build job: "ace-demo-canary/0.1. Monaco",
				wait: false
			}
		}
	}
}
