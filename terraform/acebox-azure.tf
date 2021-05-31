resource "azurerm_resource_group" "rg" {
  name = "${var.name_prefix}-rg-${random_id.uuid.hex}"
  count = var.azure_count
  location = var.azure_location
  tags = {
    environment = "acebox"
  }
}

resource "azurerm_virtual_network" "vnet" {
  name = "acebox-vnet"
  count = var.azure_count
  address_space = ["10.0.0.0/16"]
  location = var.azure_location
  resource_group_name = azurerm_resource_group.rg[0].name
  tags = {
    environment = "acebox"
  }
}

resource "azurerm_subnet" "ace-box_subnet" {
  name = "acebox_subnet"
  count = var.azure_count
  resource_group_name =  azurerm_resource_group.rg[0].name
  virtual_network_name = azurerm_virtual_network.vnet[0].name
  address_prefix = "10.0.1.0/24"
}

resource "azurerm_public_ip" "acebox_publicip" {
  name = "acebox_publicip"
  count = var.azure_count
  location = var.azure_location
  resource_group_name = azurerm_resource_group.rg[0].name
  allocation_method = "Dynamic"
  sku = "Basic"
  tags = {
    environment = "acebox"
  }
}

resource "azurerm_network_interface" "acebox-nic" {
  name = "acebox-nic"
  location = var.azure_location
  resource_group_name = azurerm_resource_group.rg[0].name
  count = var.azure_count

  ip_configuration {
    name = "ipconfig1"
    subnet_id = azurerm_subnet.ace-box_subnet[0].id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id = azurerm_public_ip.acebox_publicip[0].id
  }
  tags = {
    environment = "acebox"
  }
}

resource "azurerm_network_interface_security_group_association" "acebox-nic-nsg" {
    network_interface_id      = azurerm_network_interface.acebox-nic[0].id
    network_security_group_id = azurerm_network_security_group.acebox_nsg[0].id
}

resource "azurerm_network_security_group" "acebox_nsg" {
    name                = "acebox-nsg"
    location            = var.azure_location
    resource_group_name = azurerm_resource_group.rg[0].name
    count = var.azure_count

    security_rule {
        name                       = "SSH"
        priority                   = 1001
        direction                  = "Inbound"
        access                     = "Allow"
        protocol                   = "Tcp"
        source_port_range          = "*"
        destination_port_range     = "22"
        source_address_prefix      = "*"
        destination_address_prefix = "*"
    }
    security_rule {
        name                       = "HTTP"
        priority                   = 1002
        direction                  = "Inbound"
        access                     = "Allow"
        protocol                   = "Tcp"
        source_port_range          = "*"
        destination_port_range     = "80"
        source_address_prefix      = "*"
        destination_address_prefix = "*"
    }
    security_rule{
        name                       = "HTTPS"
        priority                   = 1003
        direction                  = "Inbound"
        access                     = "Allow"
        protocol                   = "Tcp"
        source_port_range          = "*"
        destination_port_range     = "443"
        source_address_prefix      = "*"
        destination_address_prefix = "*"
    }

    tags = {
        environment = "acebox"
    }
}

# resource "azurerm_firewall" "acebox-azure_firewall" {
#   count = var.azure_count
#   depends_on=[azurerm_public_ip.acebox_publicip[0]]
#   name = "ace-box_firewall"
#   resource_group_name = azurerm_resource_group.rg[0].name
#   location = var.azure_location
#   ip_configuration {
#     name = "acebox-${var.azure_location}-${random_id.uuid.hex}-azure-firewall-config"
#     subnet_id = azurerm_subnet.ace-box_subnet[0].id
#     public_ip_address_id = azurerm_public_ip.acebox_publicip[0].id
#   }
 
#   tags = {
#     environment = "acebox"
#   }
# }

# resource "azurerm_firewall_network_rule_collection" "acebox-fw-web" {
#   name = "acebox-azure-firewall-web-traffc"
#   azure_firewall_name = azurerm_firewall.acebox-azure_firewall[0].name
#   resource_group_name = azurerm_resource_group.rg[0].name
#   priority = 101
#   action = "Allow"
#   rule {
#     name = "HTTP"
#     source_addresses = ["*"]
#     destination_ports = ["80"]
#     destination_addresses = ["*"]
#     protocols = ["TCP"]  
#   }
#   rule {
#     name = "HTTPS"
#     source_addresses = ["*"]
#     destination_ports = ["443"]
#     destination_addresses = ["*"]
#     protocols = ["TCP"]
#   }
# }

resource "azurerm_linux_virtual_machine" "acebox" {
  name                  = "ace-box"  
  location              = var.azure_location
  resource_group_name   = azurerm_resource_group.rg[0].name
  network_interface_ids = [azurerm_network_interface.acebox-nic[0].id]
  size                  = var.azure_instance_size
  admin_username        = var.acebox_user
  count = var.azure_count

  admin_ssh_key {
      username = var.acebox_user
      public_key = file(var.ssh_keys["public"])
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "StandardSSD_LRS"
    disk_size_gb         = "40"
  }

  tags = {
        environment = "acebox"
  }

  connection {
    host        = self.public_ip_address
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
        "/home/${var.acebox_user}/install_fixed.sh ${self.public_ip_address} ${var.acebox_user}"
      ]
  }
}

output "acebox_azure" {
  #value = "connect using ssh -i [location of key file] ${var.acebox_user}@${google_compute_instance.acebox[0].network_interface[0].access_config[0].nat_ip}"
  value = "${azurerm_public_ip.acebox_publicip.*}"
}