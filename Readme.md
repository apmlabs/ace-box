# Welcome to the ACE-BOX

The ace-box is an all-in-one Autonomous Cloud Enablement machine that you can use as a portable sandbox, demo and testing environment. The key is that it is spun up on demand on your local workstation, without the need of an expensive cloud provider. 

Vagrant is used for spinning up the VM, Ansible is used for setting up the various components.
- [Welcome to the ACE-BOX](#welcome-to-the-ace-box)
  - [Components](#components)
  - [Prerequisites](#prerequisites)
  - [Spinning up the ace-box](#spinning-up-the-ace-box)
    - [Step 1 - Clone the ace-box repository](#step-1---clone-the-ace-box-repository)
    - [Step 2 - change directory to microk8s](#step-2---change-directory-to-microk8s)
    - [Step 3 - create a config file](#step-3---create-a-config-file)
    - [Step 4 - Provision](#step-4---provision)
    - [Troubleshooting](#troubleshooting)
  - [Accessing ace-box dashboard](#accessing-ace-box-dashboard)
  - [SSH into the box](#ssh-into-the-box)
  - [Cleaning up](#cleaning-up)
  - [Behind the scenes](#behind-the-scenes)


## Components
ACE-BOX comes with the following components
| Component | version |
|----|-------|
| microk8s | 1.18 |
| jenkins | lts (222.3 at time of writing) |
| helm | 3 |
| oneagent | latest |
| activegate for private synthetic node | latest |
| ace dashboard | built on the spot |
| gitea local git server | 1.11.6 |

## Prerequisites
To run the ace-box, the following is required:
- a workstation with at least **16GB of RAM** and **2 CPU cores (non-virtualized)**
- virtualbox installed (6.1.x tested)
- vagrant installed (2.2.7 tested)
- Dynatrace tenant (prod or sprint, dev not recommended)
- github account
  - a designated organization that you will use to fork a repository. The organization name will have to be added to the configuration file lateron 
  - a personal access token. Check [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) for more info
- Hyper-V disabled on Windows machines, check [Troubleshooting](#troubleshooting) for more information

## Spinning up the ace-box

### Step 1 - Clone the ace-box repository
Make sure that you have the ace-box repository cloned locally

### Step 2 - change directory to microk8s
```
$ cd microk8s
```
### Step 3 - create a config file
You need to create a config file called `config.yml` that contains the information needed to bring up the vm. You can use `config.yml.template` as a base.

**Note1:** YAML is space sensitive so make sure the indentation is correct. YAML does not allow [tabs](https://yaml.org/faq.html) - even though most code editors replace them with spaces for you!

**Note2:** If you had forked this repo and want to update it with your own changes, a `gitignore` entry has been added for the config.yml file so you do not accidentally spill your tokens :-).

The below config.yml example will spin up an ace-box with all features in a demo mode (everything pre-configured).

```
dynatrace:
  tenant:     ''    # https://abc12345.live.dynatrace.com OR https://[managed-domain]/e/[environmentguid]
  apitoken:   ''    # full scope
  paastoken:  ''
acebox:
  specs:
    cpu: 3                      # number of cpu vcores
    mem: 8196                   # memory assignment in MB
    priv_ip: "192.168.50.10"    # private IP - do NOT change, will BREAK things
    disk: "50GB"
  features:
    oneagent: true              # install Dynatrace OneAgent, defaults to true
    activegate:  true            # install Dynatrace ActiveGate for Private Synthetic, defaults to false
    jenkins: true               # install Jenkins, defaults to true
    jenkins_setcreds: true      # automatically set git and dynatrace credentials in Jenkins
    gitea: true                 # install gitea local github (broken ATM), defaults to false
    dashboard: true             # install ACE dashboard, defaults to false
    mode: "demo"                # select mode for ace-box. choose between "training" (default) and "demo"
    keptn: true                 # install keptn, defaults to false
  config:
    keptn:
      version: "0.6.2"
      dynatrace_service_version: "0.7.1"
      dynatrace_sli_service_version: "0.4.2"
    jenkins:
      set_creds: true
      set_jenkinslib: true
      jenkins_lib_url: "https://github.com/dynatrace-ace/ace-jenkins-extensions.git"
      keptn_lib_url: "https://github.com/keptn-sandbox/keptn-jenkins-library.git"
    microk8s:
      domain_ext: "nip.io"      # defaults to xip.io, set to nip.io in case of stability issues
      addons: "dns storage registry ingress "
    git:
      user: "dynatrace"         # user that will be created to log in to gitea, password is the same, defaults to "dynatrace"
      email: "ace@ace.ace"      # email assigned to user, for account creation purposes, defaults to "ace@ace.ace"
      org: "ace"                # org that will be created on gitea, defaults to "ace"
      repo: "hot-repo"          # repo that will be created on gitea, defaults to "hot-repo"
```

### Step 4 - Provision
Run the following commands to bring up the virtual machine
```
$ vagrant up
```
Vagrant will perform the following:
- Create an Ubuntu VM
- Give the Ubuntu VM the name ace-box and give it an IP
- Use Ansible to install:
    - Dynatrace OneAgent via Ansible Role
    - Microk8s + dashboard (exposed on nodePort 31100, https) and allow to skip token for dashboard
    - Jenkins (exposed on nodePort 31000)
    - A dashboard with handy links (exposed on nodePort 30001)
  
**This process will take some time, grab a coffee**

**Note:** The first time you will need to enter your passord at least once.

**Note:** Windows users will be asked to confirm security notifications a couple of times during the provisioning process, so keep an eye out for them.

### Troubleshooting
1. During testing it was found that when spinning up the VM while being connected to the corporate VPN it would sometimes have connectivity issues. It is best to disconnect from the VPN while provisioning. This will also drastically speed up the provision process
2. Some users had issues with (old) customer vpn software that was installed - not even connected -  causing issues with the virtual network adaptors. If you are having issues provisioning the VM, uninstall them when possible
3. If you are using a Windows workstation, ensure that Hyper-V native virtualization has been disabled as it clashes with virtualbox. Hyper-V support is on the roadmap. Check this [doc](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v) on how to disable Hyper-V
4. If at any given time the provisioning fails, it is best to execute a `vagrant destroy` followed by a `vagrant up`
5. During testing there were some cases where Jenkins plugins refused to install while provisioning which renders the installation useless for the other usecases. In that case, it is best to execute a `vagrant destroy` followed by a `vagrant up`

## Accessing ace-box dashboard
At the end of the provisioning, the ACE dashboard can be accessed in the browser by navigating to `http://dashboard.192.168.50.10.nip.io`. It contains all the information and all the links to access the installed services.

## SSH into the box
Inside the `microk8s` folder, execute `vagrant ssh` to gain access to the VM

## Cleaning up
Vagrant offers many commands to deal with the VM, check the below:
| Command | Result |
|----|-------|
| `vagrant destroy` | stops and deletes all traces of the vagrant machine |
| `vagrant halt` | stops the vagrant machine - i.e. shutting down your workstation |
| `vagrant suspend` | suspends the machine - i.e. sleep your workstation |
| `vagrant resume` | resume a suspended vagrant machine |
| `vagrant up` | starts and provisions the vagrant environment |
| `vagrant box update` | update the base box from time to time to ensure it is the latest version. While provisioning a message will be shown that there are updates available |

## Behind the scenes

When running the çvagrant up` command the following takes place:
1. The `Vagrantfile` is read
2. Some required Vagrant plugins are installed
3. The `config.yml` file is loaded
4. An `ubuntu/xenial64` Virtual Machine is spun up based on the specs found in the `config.yml` file. If needed, the image gets downloaded
5. Networking for the VM gets configured
6. Once the VM has been spun up, Vagrant `ssh` into it and start the provisioning. `ansible_local` Vagrant provisioner is used which will install ansible on the VM.
7. Package manager will update the vm and install VirtualBox Guest Additions.
8. The provisioner does the following:
   1. The `ansible/initial.yml` file is loaded.
   2. Some init tasks are executed based on `ansible/playbooks/init_tasks.yaml` such as installing supporting packages and resizing disks
   3. Microk8s and addons are installed based on `ansible/playbooks/microk8s_tasks.yaml`
   4. Helm is installed based on `ansible/playbooks/helm_tasks.yaml`. Helm repos are also added
   5. If enabled, OneAgent is installed based on `ansible/playbooks/dtoneagent_tasks.yaml`
   6. If enabled, Jenkins is installed based on `ansible/playbooks/jenkins_tasks.yaml`. This uses the helm chart found in `k8s/jenkins-values.yml` which will not only install Jenkins but also perform plugin installation and set up our skeleton pipelines.
   7. If enabled, An ACE dashboard is built and deployed as described in `ansible/playbooks/dashboard_tasks.yaml`
   8. If enabled, an ActiveGate is installed based on `ansible/playbooks/dtactivegate_tasks.yaml`. This also installs all required packages.
   9. Post installation tasks are also executed, as described in `ansible/playbooks/postinstall_tasks.yaml`. This includes configuring `iptables` for port forwarding

## Triggering a pipeline run
If you installed the ace-box in `demo` mode, you can navigate to `Jenkins` and trigger the `1. Build` pipeline.