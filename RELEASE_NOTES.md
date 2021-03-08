# ACE-BOX Release notes

## v1.7-beta - March 8 2021
### New features
#### ACE-BOX Cloud Edition
There is now the possibility to deploy the ACE-BOX on cloud providers using Terraform. For this first release GCP only is supported using Terraform.
A generic installation script is there to support any virtual machine with a public IP address and ports 80/443 exposed.
Check out the **microk8s/terraform** folder for more info.

#### Monaco installed on ACE-BOX
Additionally to being available on the Jenkins pipelines, monaco is now also available as the same-named command.
It is also used to deploy an ACE dashboard on Dynatrace instance.

#### ACE Dashboard on Dynatrace
As an alternative to the ACE-Dashboard that is deployed on Kubernetes, there is now also a Dynatrace dashboard containing all the links.

#### Helm chart to deploy SimpleNode Staging in ace pipeline
In the staging environment, a helm chart was introduced to deploy the simplenodeservice as opposed to traditional yaml file deployment. This will also facilitate the release inventory functionality in Dynatrace.

### Fixes
#### Keptn
Update `dynatrace-service` and `dynatrace-sli-service` to the latest version
Increased helm timeout for installation


## v1.6 - February 2021
### New features
#### Move to Dynatrace Operator
The OneAgent Operator was replaced with the Dynatrace Operator that will also install kubernetes monitoring on microk8s.

#### Addition of Monaco and Quality Gates Perform HOT sessions
The HOT sessions given by the ACE team at Perform around Monaco and Quality Gates are now added to the ace-box.
In Gitea you will see dedicated organizations for them as well.

#### Addition of true GitOps Monaco example
A demo flow for true GitOps with Monaco and Gitea has been created.
An onboarding pipeline exists for information gathering which then uses a template structure combined with an onboarding branch, pull request and approval to merge back into a goldmaster configuration branch.

### Fixes
#### Keptn
Update `dynatrace-service` and `dynatrace-sli-service` to the latest version
Increased helm timeout for installation

#### Gitea
Increased gitea ingress max size for commits

#### Updates
Technical update of plugins, keptn versions, images, etc.

#### Restructuring of Jenkins pipelines for HOT and Demo
There is now a clear strucutre in place for the demo and hands-on training usecases in Jenkins.

## v1.5 - January 2021
### New features
#### Gitlab support
Added support for gitlab! By setting `acebox.features.gitlab` to `true` it will be installed during `vagrant up`.

**NOTE:** Gitlab is quite heavy in resource consumption, even though it currently gets deployed in a "minimal" state. You might need to turn off certain features such as jenkins and/or the activegate to be able to run GitLab.

#### Kubernetes ActiveGate support
A new feature is the ability to deploy an ActiveGate using a container image and thus on a Kubernetes cluster. By setting `acebox.features.activegatekube` to `true` it will be installed during `vagrant up`. You can use this ActiveGate to set up Kubernetes monitoring, by pointing it to th endpoint [http://](https://192.168.50.10:16443/). The bearer token can be retrieved as per the documentation, it is also added as an environment variable to Jenkins so the integration can be configured using Monaco.

### Fixes
#### Reduce resource requests for simplenodeservice
By default, simplenodeservice, deployed using jenkins or gitlab, requested a fair bit of resources from kubernetes. This has now been drastically reduced to ensure that no pods end up in a Pending state
#### Update monaco to OSS
All references to "mac" have been removed and ace-box is now using the official OSS version of Monaco
#### Added ntp package
To fix a time drift issue due to either the host being hibernated and sometimes due to high VM CPU usage, ntp package was installed