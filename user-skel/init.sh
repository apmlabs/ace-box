#!/bin/bash

# This script will be triggered by Terraform as part of the provisioning process.
# It can also be triggered manually on a VM.

# Prevent input prompts by specifying frontend is not interactive
echo 'debconf debconf/frontend select Noninteractive' | sudo debconf-set-selections

echo "INIT - Update apt-get and upgrade already install packages..."
sudo apt-get update && sudo apt-get dist-upgrade -y

echo "INIT - Setting up Python..."
sudo apt-get install python3.8 -y
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.8 1

# Update apt-get again to resolve unmet python3.8/pip dependencies
sudo apt-get update
sudo apt-get install python3-pip -y

# Upgrade pip
python3.8 -m pip --version
python3.8 -m pip install --upgrade pip -q

# Ansible
# Sudo required in order to properly set up symlinks, etc.
echo "INIT - Installing Ansible..."
sudo python3.8 -m pip install ansible -q
ansible --version

echo "INIT - Installing Ansible requirements..."
ansible-galaxy install -r ./ansible/requirements.yml

# Setup ace-cli
echo "INIT - Setting up ACE-CLI..."
python3.8 -m pip install -r ./.ace/requirements.txt
sudo cp ./.ace/ace /usr/local/bin/ace
sudo chmod 0755 /usr/local/bin/ace

# Remove Windows-style newline characters
sudo sed -i 's/\r$//' /usr/local/bin/ace

ace --version
