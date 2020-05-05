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


## Components
ACE-BOX comes with the following components
| Component | version |
|----|-------|
| microk8s | 1.18 |
| jenkins | lts (222.3 at time of writing) |
| helm | 2 |
| oneagent | latest |
| activegate for private synthetic node | latest |
| ace dashboard | built on the spot |

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

```
dynatrace:
  tenant:     ''    # https://abc12345.live.dynatrace.com OR https://[managed-domain]/e/[environmentguid]
  apitoken:   ''    # full scope
  paastoken:  ''
git:
  username:   ''    # Github username
  pat:        ''    # Gitub Personal access token created as part of prerequisites, "repo" scope is sufficient. 
  email:      ''    # Github email
  org:        ''    # Github org created as part of prerequisites
acebox:
  specs:
    cpu: 2                      # number of cpu vcores (default: 2)
    mem: 8192                   # memory assignment in MB (default: 8192)
    priv_ip: "192.168.50.10"    # private IP  (default: "192.168.50.10", DO NOT CHANGE)
    disk: "50GB"                # disk size (default: "50GB")
  features:
    oneagent: true              # install Dynatrace OneAgent (default: true)
    activegate: true            # install Dynatrace ActiveGate for Private Synthetic, (default: true)
    jenkins: true               # install Jenkins (default: true)
    jenkins_setcreds: true      # automatically set git and dynatrace credentials in Jenkins (default: true)
    dashboard: true             # install ACE dashboard (default: true)
  microk8s:
    addons: "dns dashboard storage registry"  # which addons to micrk8s to install (https://microk8s.io/docs/addons) WARN: will increase resource usage (default: "dns dashboard storage registry")
vagrant:
  provider: "virtualbox"        # provider to use, only "virtualbox" is supported as of now
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

**Note:** Windows users will be asked to confirm security notifications a couple of times during the provisioning process, so keep an eye out for them.

### Troubleshooting
1. During testing it was found that when spinning up the VM while being connected to the corporate VPN it would sometimes have connectivity issues. It is best to disconnect from the VPN while provisioning. This will also drastically speed up the provision process
2. Some users had issues with (old) customer vpn software that was installed - not even connected -  causing issues with the virtual network adaptors. If you are having issues provisioning the VM, uninstall them when possible
3. If you are using a Windows workstation, ensure that Hyper-V native virtualization has been disabled as it clashes with virtualbox. Hyper-V support is on the roadmap. Check this [doc](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v) on how to disable Hyper-V
4. If at any given time the provisioning fails, it is best to execute a `vagrant destroy` followed by a `vagrant up`

## Accessing ace-box dashboard
At the end of the provisioning, the ACE dashboard can be accessed in the browser by navigating to `http://ace-box:30001/`. Alternatively the IP address can be used that was specified in the `config.yml` file.

These are the services currently exposed (you should be able to reach them by opening a browser on your workstation)
| Service | Address |
|----|-------|
| ace dashboard | http://ace-box:30001 |
| jenkins | http://ace-box:31000 |
| kubernetes dashboard | https://ace-box:31100 |
| simplenode staging | http://ace-box:31500 (not yet running after provisioning) |
| simplenode prod | http://ace-box:31600 (not yet running after provisioning) |


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