variable "gcloud_project" {
  description = "Google Cloud Project where resources will be created"
}

variable "gcloud_zone" {
  description = "Google Cloud Zone where resources will be created"
}

variable "gcloud_cred_file" {
  description = "Path to GCloud credential file"
}

variable "name_prefix" {
  description = "Prefix to distinguish the instance"
  default = "ace-box-cloud"
}

variable "acebox_size" {
  description = "Size (machine type) of the ace-box instance"
  default     = "n2-standard-8"
}

variable "acebox_user" {
  description = "Initial user when ace-box is created"
  default     = "ace"
}

variable "acebox_os" {
  description = "Ubuntu version to use"
  default     = "ubuntu-minimal-1804-lts"
}

variable "ssh_keys" {
  description = "Paths to public and private SSH keys for ace-box user"
  default = {
    private = "./key"
    public  = "./key.pub"
  }
}

variable "gcloud_count" {
  description = "Set 1 to provision in GCP"
  default = 0
}

variable "azure_count" {
  description = "Set 1 to provision in Azure"
  default = 0
}

variable "azure_location" {
  description = "Azure Locationwhere resources will be created"
  default = "westeurope"
}

variable "azure_instance_size" {
  description = "Azure VM Instance type"
  default = "Standard_A4m_v2"
}