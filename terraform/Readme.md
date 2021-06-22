# Using Terraform to spin up a ACE-BOX Cloud 

Since the ACE-BOX uses Ansible underneath for configuration management and deploying services, it is also possible to use Terraform for the provisioning.
At the moment, GCP and Azure are supported with a ready-made Terraform config.

## Requirements
Terraform needs to be locally installed.
A GCP/Azure/AWS account is needed.

## Installing on GCP, AWS or Azure
Check the **azure**, **aws** and **gcloud** subfolders for cloud-specific instructions.

## Running on a regular (cloud) VM Instance
BYO Ubuntu Virtual Machine has not been tested, but should be possible.
Ensure the repo contents are available on the virtual machine and that **ansible** has been installed.

### Requirements
1. An Ubuntu 18.04 virtual machine (Ubuntu 18.04 LTS "minimal" tested)
2. A public IP address
3. Port 80 exposed
4. A non-root user to run the script actions needs to be created (e.g. `ace`)

### Instructions

1. Copy over the entire repository to the virtual machine to the user's home directory. Structure should be ~/ace-box/
2. Call the script inside the **terraform** folder to install:

    ```bash
    $ cd [root of repo]
    $ ./install.sh [VM_PUBLIC_IP] [NON_ROOT_USER]
        VM_PUBLIC_IP: public IP if the VM, used for ingress generation
        NON_ROOT_USER: username that will be used, user has to already exist. use $USER to put current user
    ```
