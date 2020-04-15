# Welcome to the ACE-BOX


## Instructions to create VM:
- create config.yml file based on config.yml.template
- fill in Dynatrace details in config.yml
- cd into microk8s folder
- execute vagrant up

## Vagrant will perform the following:
- Create an Ubuntu VM
- Give the Ubuntu VM the name ace-box and give it an IP
- Use Ansible to install:
    - Dynatrace OneAgent via Ansible Role
    - Microk8s + dashboard (exposed on 8080)
    - Jenkins (exposed on 31000)
    - Gogs (exposed on 31001)
    - A dashboard with handy links (exposed on 30001)

## SSH into the box
Inside the microk8s folder, execute vagrant ssh to gain access to the VM

## Open Dashboard
Depending on the host os, you can navigate to it using a name: http://ace-box:30001 or ip: http://192.168.50.10:30001
