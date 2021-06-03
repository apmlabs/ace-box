output "acebox_azure_ip" {
  value = "connect using: ssh -i ${var.ssh_keys.private} ${var.acebox_user}@${azurerm_public_ip.acebox_publicip.ip_address}"
}

output "acebox_dashboard" {
  value = "http://dashboard.${azurerm_public_ip.acebox_publicip.ip_address}.nip.io using dynatrace:dynatrace to log in"
}