#!/usr/bin/env bash

# This script will be triggered by Terraform as part of the provisioning process.
# It can also be triggered manually on a VM.

set -euo pipefail
if [ -z "$1" ]
then
    echo "Argument 1 containing public IP missing"
    exit;
fi 

if [ -z "$2" ]
then
    echo "Argument 2 containing the non_root_user is missing"
    exit;
fi 

echo "Public IP address: $1"
echo "Non-root user: $2"

export DEBIAN_FRONTEND=noninteractive

echo "INIT - Start Initial Install"
sudo apt-get update -y
sudo apt-get upgrade -y

echo "INIT - Installing packages and dependencies..."
sudo apt-get install ansible -y
ansible --version
echo "INIT - Setting up structure..."
sudo mkdir /vagrant
sudo cp -R ~/microk8s/* /vagrant

echo "INIT - Run Ansible Playbook"
ansible-playbook -vv /vagrant/ansible/initial.yml --extra-vars "public_ip=$1 acebox_provisioner=terraform non_root_user=$2"