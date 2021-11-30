terraform {
  required_version = ">= 0.12.20"

  required_providers {
    random  = "~> 2.2"
    local   = "~> 1.4"
    azurerm = ">= 2.61.0"
  }
}
