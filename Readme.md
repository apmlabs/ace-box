# Welcome to the ACE-BOX

The ace-box is an all-in-one Autonomous Cloud Enablement machine that you can use as a portable sandbox, demo and testing environment. The key is that it is spun up on demand on your local workstation, without the need of an expensive cloud provider. 

Vagrant is used for spinning up the VM, Ansible is used for setting up the various components.

It comes with the following:
- microk8s
- container registry
- jenkins
- helm
- oneagent deployed via helm
- activegate for private synthetic
- an easy to use ace dashboard

## Prerequisites
To run the ace-box, the following is required:
- a workstation with at least **16GB of RAM** and **2 CPU cores (non-virtualized)**
- virtualbox installed (6.1.x)
- vagrant installed (2.2.7+)
- Dynatrace tenant (prod or sprint, dev not recommended)
- github account

## Spinning up the ace-box

### Step 1 - Clone the ace-box repository
Make sure that you have the ace-box repository cloned locally

### Step 2 - change directory to microk8s
```
$ cd microk8s
```
### Step 3 - create a config file
You need to create a config file called `config.yml` that contains the information needed to bring up the vm. You can use `config.yml.template` as a base.
```
dynatrace:
  tenant:     ''    # abc12345.live.dynatrace.com OR [managed-domain]/e/[environmentguid]
  apitoken:   ''
  paastoken:  ''
git:
  username:   ''
  pat:        ''    # "repo" scope is sufficient
  email:      ''
  org:        ''    # Github org created
acebox:
  specs:
    cpu: 2                      # number of cpu vcores
    mem: 8192                   # memory assignment in MB
    priv_ip: "192.168.50.10"    # private IP 
    disk: "50GB"                # disk size
  features:
    oneagent: true              # install Dynatrace OneAgent, defaults to true
    activegate: true            # install Dynatrace ActiveGate for Private Synthetic, defaults to false
    jenkins: true               # install Jenkins, defaults to true
    jenkins_setcreds: true      # automatically set git and dynatrace credentials in Jenkins
    dashboard: true             # install ACE dashboard, defaults to false
  microk8s:
    addons: "dns dashboard storage registry"  # which addons to micrk8s to install (https://microk8s.io/docs/addons) WARN: will increase resource usage
vagrant:
  provider: "virtualbox"    # provider to use, set to "hyperv" for hyper-v, "virtualbox" for VirtualBox (default)
```

### Step 4 - Provision
Run the following commands to bring up the virtual machine
```
$ vagrant init
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

## Accessing ace-box dashboard
At the end of the provisioning, the ACE dashboard can be accessed in the browser by navigating to `http://ace-box:30001/`. Alternatively the IP address can be used that was specified in the `config.yml` file.

## SSH into the box
Inside the microk8s folder, execute `vagrant ssh` to gain access to the VM