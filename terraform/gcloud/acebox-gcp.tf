## acebox requires public IP address
resource "google_compute_address" "acebox" {
  name = "${var.name_prefix}-ipv4-addr-${random_id.uuid.hex}"
}

## Allow access to acebox via HTTPS
resource "google_compute_firewall" "acebox-https" {
  name    = "${var.name_prefix}-allow-https-${random_id.uuid.hex}"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["443", "16443"]
  }

  target_tags = ["${var.name_prefix}-${random_id.uuid.hex}"]
}

## Allow access to acebox via HTTPS
resource "google_compute_firewall" "acebox-http" {
  name    = "${var.name_prefix}-allow-http-${random_id.uuid.hex}"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  target_tags = ["${var.name_prefix}-${random_id.uuid.hex}"]
}

## Create key pair
resource "tls_private_key" "acebox_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "local_file" "acebox_pem" { 
  filename = "${path.module}/${var.private_ssh_key}"
  content = tls_private_key.acebox_key.private_key_pem
  file_permission = 400
}

## Create acebox host
resource "google_compute_instance" "acebox" {
  name         = "${var.name_prefix}-${random_id.uuid.hex}"
  machine_type = var.acebox_size
  zone         = var.gcloud_zone

  boot_disk {
    initialize_params {
      image = var.acebox_os
      size  = "40"
    }
  }

  network_interface {
    network = "default"

    access_config {
      nat_ip = google_compute_address.acebox.address
    }
  }

  metadata = {
    sshKeys = "${var.acebox_user}:${tls_private_key.acebox_key.public_key_openssh}"
  }

  tags = ["${var.name_prefix}-${random_id.uuid.hex}"]

  connection {
    host        = self.network_interface.0.access_config.0.nat_ip
    type        = "ssh"
    user        = var.acebox_user
    private_key = tls_private_key.acebox_key.private_key_pem
  }

  provisioner "remote-exec" {
    inline = ["sudo apt-get update && sudo DEBIAN_FRONTEND=noninteractive apt-get upgrade -y"]
  }

  provisioner "remote-exec" {
    inline = ["mkdir ~/ace-box/"]
  }

  provisioner "file" {
    source      = "${path.module}/../../microk8s"
    destination = "~/ace-box/"
  }

  provisioner "file" {
    source      = "${path.module}/../../install.sh"
    destination = "~/install.sh"
  }

}

resource "null_resource" "provisioner" {

  connection {
    host        = google_compute_instance.acebox.network_interface.0.access_config.0.nat_ip
    type        = "ssh"
    user        = var.acebox_user
    private_key = tls_private_key.acebox_key.private_key_pem
  }

  depends_on = [google_dns_record_set.ace_box, google_compute_instance.acebox]

  provisioner "remote-exec" {
    inline = [
        "tr -d '\\015' < /home/${var.acebox_user}/install.sh > /home/${var.acebox_user}/install_fixed.sh",
        "chmod +x /home/${var.acebox_user}/install_fixed.sh",
        "/home/${var.acebox_user}/install_fixed.sh  --ip=${google_compute_instance.acebox.network_interface.0.access_config.0.nat_ip} --user=${var.acebox_user} --custom-domain=${var.custom_domain}"
      ]
  }

}