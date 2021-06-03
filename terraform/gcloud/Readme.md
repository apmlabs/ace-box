# Using Terraform to spin up a ACE-BOX Cloud 

Since the ACE-BOX uses Ansible underneath for configuration management and deploying services, it is also possible to use Terraform for the provisioning.
At the moment, GCP and Azure are supported with a ready-made Terraform config.

## Requirements
Terraform needs to be locally installed.
A GCP account is needed.

## Instructions for GCP

1. Create a `config.yml` file as per usual (see repo main help for details)
1. Prepare Service Account and download JSON key credentials in GCP.

    ```
    https://cloud.google.com/iam/docs/creating-managing-service-accounts
    ```

1. Navigate to the `terraform/gcloud` folder

    ```
    $ cd microk8s/terraform/gcloud
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

1. Create a `terraform.tfvars` file inside the *terraform/gcloud* folder
   It needs to contain the following as a minimum:
    
    ```
    gcloud_project    = "myGCPProject" # GCP Project you want to use
    gcloud_cred_file  = "/location/to/sakey.json" # location of the Service Account JSON created earlier
    gcloud_zone       = "europe-west1-b" # zone where you want to provision the resources. Check out https://cloud.google.com/compute/docs/regions-zones#available for available zones
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