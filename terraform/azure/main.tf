terraform {

}

provider "azurerm" {
  features {}
}


## For creating UUIDs
resource "random_id" "uuid" {
  byte_length = 4
}
