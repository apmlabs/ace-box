# ACE-BOX Release notes

## v1.5 - February 2021
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