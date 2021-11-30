provider "aws" {
  region = var.aws_region
}

## For creating UUIDs
resource "random_id" "uuid" {
  byte_length = 4
}