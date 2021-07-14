### Use case: Canary + auto remediation

# Prepare environment

Before we get started with the actual use case, let's familiarize ourselves with the demo setup.

First, a dashboard has been deployed and is available at `http(s)://dashboard.<ingress domain>` . Basic auth credentials were provided at the end of the provisioning process. The dashboard is where you can find all relevant links and credentials.

All code and info material has been made available in the *auto-remediation* organization on *Gitea* ( `http(s)://gitea.<ingress domain>/auto-remediation` ):

- ace-demo-canary contains all application source code, Jenkins pipelines and Monaco resources.
- ace-demo-canary-awx contains playbooks which will be run from AWX.
- ace-demo-canary-docs contains step-by-step instructions for the use case (the one you're probably reading right now).

In addition, Jenkins and a Jenkins project "ace-demo-canary" was set up. This project contains pipelines relevant for the use case:

![jenkins_pipeline_overview](../assets/images/jenkins_pipeline_overview.png)

## 1. Build images

In order to get started, go to the project overview in Jenkins and trigger the first pipeline, "1. Build images". This pipeline will do a couple of things:

- Two versions of *simplenodeapp* are built and pushed to the local registry, build version *1* and *4*. *Build 1* will be the currently deployed and healthy "live" version of the app. *Build 4* will become the app's new canary version, however introduces a response time degradation and failure rate increase. See app.js in git repo auto-remediation/ace-demo-canary for details.
- Two services are deployed, *simplenodeapp build 1* and *simplenodeapp build 4*. The deploying pipeline "3. Deploy" is triggered automatically after each successful build. For now, all traffic is routed to *build 1*.
- The Monaco pipeline is started which sets up use case relevant resources in your Dynatrace tenant.

Eventually, all pipelines should have run successfully which ycan be verified in the project overview:

![jenkins_build_success](../assets/images/jenkins_build_success.png)

At this point, the live version of your service should be available at:

```
http(s)://simplenodeservice.canary.<ingress domain>
```
