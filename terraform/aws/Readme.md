# Using Terraform to spin up a ACE-BOX Cloud 

Since the ACE-BOX uses Ansible underneath for configuration management and deploying services, it is also possible to use Terraform for the provisioning.
At the moment, GCP and Azure are supported with a ready-made Terraform config.

## Requirements

- Terraform CLI (0.14.9+) installed
- AWS CLI installed
- AWS Account
- Access Key that can create resources like ec2 instances and security groups

## Instructions for AWS

Three subfolders exist depending on the type of VPC you want to use:

- [Custom VPC](custom_vpc/Readme.md)
- [Default VPC](default_vpc/Readme.md)
- [Private VPC](private_vpc/Readme.md)