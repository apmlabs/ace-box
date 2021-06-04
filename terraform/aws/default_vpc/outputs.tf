output "acebox_dashboard" {
  description = "Public IPs assigned to the EC2 instance"
  value = "http://dashboard.${aws_instance.acebox.public_ip}.nip.io"
}

output "acebox_ip" {
  value = "connect using: ssh -i ${path.module}/key ${var.acebox_user}@${aws_instance.acebox.public_ip}"
}

output "comment" {
  value = "More information about dashboard credentials is printed out as part of the last provisioning step. Please scroll up."
}