
data "aws_availability_zones" "available" {}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name               = "acebox-vpc"
  cidr               = "10.0.0.0/16"
  azs                = data.aws_availability_zones.available.names
  private_subnets    = var.vpc_private_subnets
  public_subnets     = var.vpc_public_subnets
  enable_nat_gateway = var.vpc_enable_nat_gateway
  single_nat_gateway = true

  tags = var.vpc_tags
}

resource "aws_eip" "acebox_eip" {
  vpc               = true
  network_interface = aws_network_interface.acebox_nic.id
  depends_on        = [module.vpc]
}

module "security_group" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "ace-box-sg-${random_id.uuid.hex}"
  description = "Security group for ace-box"
  vpc_id      = module.vpc.vpc_id

  ingress_cidr_blocks = ["0.0.0.0/0"]
  ingress_rules       = ["http-80-tcp", "https-443-tcp", "ssh-tcp"]
  egress_rules        = ["all-all"]
}

resource "aws_network_interface" "acebox_nic" {
  subnet_id       = module.vpc.public_subnets[0]
  security_groups = [module.security_group.security_group_id]

  tags = var.vpc_tags

}