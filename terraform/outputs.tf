output "acebox_dashboard" {
  value = "http://dashboard.${google_compute_instance.acebox.network_interface[0].access_config[0].nat_ip}.nip.io"
}

output "acebox_ip" {
  value = "connect using ssh -i [location of key file] ${var.acebox_user}@${google_compute_instance.acebox.network_interface[0].access_config[0].nat_ip}"
}
