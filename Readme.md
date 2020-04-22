# Welcome to the ACE-BOX

## Prerequisites
- VirtualBox (latest version)
- Vagrant 
- A Dynatrace tenant (sprint or prod)
- A github account

## Instructions to create VM:
1. cd into microk8s folder
1. create config.yml file based on config.yml.template
1. fill in details in config.yml
1. execute vagrant up

## Vagrant will perform the following:
- Create an Ubuntu VM
- Give the Ubuntu VM the name ace-box and give it an IP
- Use Ansible to install:
    - Dynatrace OneAgent via Ansible Role
    - Microk8s + dashboard (exposed on nodePort 31100, https) and allow to skip token for dashboard
    - Jenkins (exposed on nodePort 31000)
    - Gogs (exposed on nodePort 31001)
    - A dashboard with handy links (exposed on nodePort 30001)

## SSH into the box
Inside the microk8s folder, execute vagrant ssh to gain access to the VM

## Open Dashboard
Depending on the host os, you can navigate to it using a name: http://ace-box:30001 or ip: http://192.168.50.10:30001
