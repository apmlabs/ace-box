## acebox requires public IP address
resource "google_compute_address" "acebox" {
  name = "${var.name_prefix}-ipv4-addr-${random_id.uuid.hex}"
  count = var.gcloud_count
}

## Allow access to acebox via HTTPS
resource "google_compute_firewall" "acebox-https" {
  name    = "${var.name_prefix}-allow-https-${random_id.uuid.hex}"
  count = var.gcloud_count
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
  count = var.gcloud_count
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  target_tags = ["${var.name_prefix}-${random_id.uuid.hex}"]
}

## Create acebox host
resource "google_compute_instance" "acebox" {
  name         = "${var.name_prefix}-${random_id.uuid.hex}"
  count = var.gcloud_count
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
      nat_ip = google_compute_address.acebox[count.index].address
    }
  }

  metadata = {
    sshKeys = "${var.acebox_user}:${file(var.ssh_keys["public"])}"
  }

  tags = ["${var.name_prefix}-${random_id.uuid.hex}"]

  connection {
    host        = self.network_interface.0.access_config.0.nat_ip
    type        = "ssh"
    user        = var.acebox_user
    private_key = file(var.ssh_keys["private"])
  }

  provisioner "remote-exec" {
    inline = ["sudo apt-get update && sudo DEBIAN_FRONTEND=noninteractive apt-get upgrade -y"]
  }

  provisioner "file" {
    source      = "${path.module}/../microk8s"
    destination = "~/"
  }

  provisioner "file" {
    source      = "${path.module}/../install.sh"
    destination = "~/install.sh"
  }

  provisioner "remote-exec" {
    inline = [
        "tr -d '\\015' < /home/${var.acebox_user}/install.sh > /home/${var.acebox_user}/install_fixed.sh",
        "chmod +x /home/${var.acebox_user}/install_fixed.sh",
        "/home/${var.acebox_user}/install_fixed.sh ${self.network_interface.0.access_config.0.nat_ip} ${var.acebox_user}"
      ]
  }
}


output "acebox_gcloud" {
  #value = "connect using ssh -i [location of key file] ${var.acebox_user}@${google_compute_instance.acebox[0].network_interface[0].access_config[0].nat_ip}"
  value = toset([
    for ace in google_compute_instance.acebox : ace.network_interface[0].access_config[0].nat_ip
  ])
}