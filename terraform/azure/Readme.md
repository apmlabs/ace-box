# Using Terraform to spin up a ACE-BOX Cloud 

Since the ACE-BOX uses Ansible underneath for configuration management and deploying services, it is also possible to use Terraform for the provisioning.
At the moment, GCP and Azure are supported with a ready-made Terraform config.

## Requirements

- Terraform needs to be locally installed.
- An Azure account is needed.
- Azure CLI.

## Instructions for Azure

1. Create a `config.yml` file as per usual (see repo main help for details)

1. Sign in to the correct subscription using the az cli

    ```bash
    $ az login
    ```

    > Note: if you have multiple subscriptions, you will have to set the default one using `az account set --subscription YOURSUBSCRIPTION`

1. Navigate to the `terraform` azure folder

    ```bash
    $ cd terraform/azure
    ```

1. Create a key pair for ssh authentication

    ```bash
    $ ssh-keygen -b 2048 -t rsa -f key
    ```

    Enter through the defaults.

1. Initialize terraform

    ```bash
    $ terraform init
    ```

1. Create a `terraform.tfvars` file inside the *terraform* folder
   It needs to contain the following as a minimum:

    ```hcl
    azure_location          = "" # azure location where you want to provision the resources
    ```

    Check out `variables.tf` for a complete list of variables

1. Verify the configuration and execution plan by running `terraform plan`

    ```bash
    $ terraform plan
    ```

1. Apply the configuration

    ```bash
    $ terraform apply
    ```
