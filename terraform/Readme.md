# Using Terraform to spin up a ACE-BOX Cloud 

Since the ACE-BOX uses Ansible underneath for configuration management and deploying services, it is also possible to use Terraform for the provisioning.
At the moment, GCP and Azure are supported with a ready-made Terraform config.

## Requirements
Terraform needs to be locally installed.
A GCP/Azure account is needed.

## Instructions for GCP

1. Create a `config.yml` file as per usual (see repo main help for details)
1. Prepare Service Account and download JSON key credentials in GCP.

    ```
    https://cloud.google.com/iam/docs/creating-managing-service-accounts
    ```

1. Navigate to the `terraform` folder

    ```
    $ cd microk8s/terraform
    ```

1. Create key pair for ssh authentication

    ```
    ssh-keygen -b 2048 -t rsa -f key
    ```
    Enter through the defaults.

1. Initialize terraform
    ```
    $ terraform init
    ```

1. Create a `terraform.tfvars` file inside the *terraform* folder
   It needs to contain the following as a minimum:
    
    ```
    gcloud_count      = 1  # Defines that you want to use GCP. Only set to 0 or 1!!
    gcloud_project    = "" # GCP Project you want to use
    gcloud_cred_file  = "" # location of the Service Account JSON created earlier
    gcloud_zone       = "" # zone where you want to provision the resources
    ```

    Check out `variables.tf` for a complete list of variables

2.  Verify the configuration by running `terraform plan`
    
    ```
    $ terraform plan
    ```

3. Apply the configuration

    ```
    $ terraform apply
    ```

## Instructions for Azure

1. Create a `config.yml` file as per usual (see repo main help for details)

1. Sign in to the correct subscription using the az cli

    ``` bash
    $ az login
    ```

1. Navigate to the `terraform` folder

    ```
    $ cd microk8s/terraform
    ```

1. Create key pair for ssh authentication

    ```
    ssh-keygen -b 2048 -t rsa -f key
    ```
    Enter through the defaults.

1. Initialize terraform
    ```
    $ terraform init
    ```

1. Create a `terraform.tfvars` file inside the *terraform* folder
   It needs to contain the following as a minimum:
    
    ```
    azure_count             = 1  # Defines that you want to use GCP. Only set to 0 or 1!!
    azure_location          = "" # azure location where you want to provision the resources
    ```

    Check out `variables.tf` for a complete list of variables

2.  Verify the configuration by running `terraform plan`
    
    ```
    $ terraform plan
    ```

3. Apply the configuration

    ```
    $ terraform apply
    ```


## Running on a regular (cloud) VM Instance
BYO Ubuntu Virtual Machine has not been tested, but should be possible.
Ensure the repo contents are available on the virtual machine and that **ansible** has been installed.

### Requirements
1. An Ubuntu 18.04 virtual machine (Ubuntu 18.04 LTS "minimal" tested)
2. A public IP address
3. Ports 80 and 443 exposed
4. Ansible installed (e.g. using `sudo apt-get install ansible -y`)

### Instructions

1. Copy over the entire repository to the virtual machine
2. Call the script inside the **terraform** folder to install:

    ```
    $ cd [root of repo]
    $ ./install.sh [VM_PUBLIC_IP] [NON_ROOT_USER]
        VM_PUBLIC_IP: public IP if the VM, used for ingress generation
        NON_ROOT_USER: username that will be used, user has to already exist
    ```