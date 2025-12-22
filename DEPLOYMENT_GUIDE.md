# ACE-Box Fixed Deployment Guide

## What's Fixed

This version of ACE-Box includes critical fixes for reliable deployment:

### 1. Dynatrace Operator Fix
- **Problem**: CRD version conflicts with v1.2.3 operator
- **Solution**: Updated to use latest operator from GitHub with proper k3s/microk8s conflict resolution
- **Changes**: 
  - Updated `dt-operator` role to use latest release
  - Added microk8s stop/k3s restart sequence
  - Updated API version to v1beta5

### 2. Terraform Provider Fix
- **Problem**: AWS provider version conflicts (5.47.0 vs >= 6.0.0)
- **Solution**: Updated to use `>= 6.0.0` in terraform.tf
- **Result**: `terraform init` works without conflicts

### 3. Secrets Management
- **Added**: `secrets.yaml.template` for secure credential management
- **Updated**: `.gitignore` to prevent accidental secret commits
- **Security**: All sensitive files excluded from version control

## Quick Deployment

### Prerequisites
1. AWS CLI configured with appropriate permissions
2. Dynatrace tenant with API token (DataExport, InstallerDownload, activeGateTokenManagement.create, entities.read, settings.read, settings.write)

### Step 1: Setup Credentials
```bash
cp secrets.yaml.template secrets.yaml
# Edit secrets.yaml with your Dynatrace credentials
```

### Step 2: Deploy Infrastructure
```bash
cd terraform/aws
terraform init
terraform apply -auto-approve
```

### Step 3: Deploy Demo
```bash
PUBLIC_IP=$(terraform output -raw acebox_ip | grep -oP '\d+\.\d+\.\d+\.\d+')
ssh -o StrictHostKeyChecking=no -i ./key ubuntu@$PUBLIC_IP "sudo ACE_BOX_USER=ubuntu ace enable demo_auto_remediation_ansible"
```

## Demo Components

The `demo_auto_remediation_ansible` use case includes:

1. **microk8s** - Kubernetes cluster (automatically stopped to prevent conflicts)
2. **k3s** - Primary Kubernetes cluster 
3. **dt-activegate-classic** - Dynatrace ActiveGate with synthetic monitoring
4. **dt-operator** - Dynatrace operator (latest version, classicFullStack mode)
5. **monaco** - Dynatrace configuration as code
6. **gitea** - Git repository server
7. **app-simplenode** - Demo application (2 versions: healthy build 1, faulty build 4)
8. **jenkins** - CI/CD pipelines for building and deploying
9. **awx** - Ansible automation platform for remediation
10. **dashboard** - Demo control interface

## Access Points

After successful deployment:

- **Dashboard**: http://dashboard.{IP}.nip.io (dynatrace/password123)
- **Gitea**: http://gitea.{IP}.nip.io (Git repositories)
- **Jenkins**: http://jenkins.{IP}.nip.io (CI/CD pipelines)
- **AWX**: http://awx.{IP}.nip.io (Ansible automation)
- **SimpleNode App**: http://simplenodeservice-canary.{IP}.nip.io

## Demo Workflow

1. **Healthy State**: SimpleNode build 1 receives 100% traffic
2. **Canary Deployment**: Jenkins deploys faulty build 4 with canary routing
3. **Problem Detection**: Dynatrace detects performance issues
4. **Auto-Remediation**: AWX playbook triggered via webhook to rollback traffic
5. **Self-Healing**: Traffic automatically returns to healthy build 1

## Verification

```bash
# Check all pods are running
ssh -i ./key ubuntu@$PUBLIC_IP "sudo kubectl get pods -A"

# Test dashboard access
curl -s -o /dev/null -w '%{http_code}' http://dashboard.$PUBLIC_IP.nip.io
# Should return 401 (authentication required - working)

# Check Dynatrace operator
ssh -i ./key ubuntu@$PUBLIC_IP "sudo kubectl get pods -n dynatrace"
# Should show operator and webhook pods running
```

## Troubleshooting

### If deployment fails on dt-operator step:
```bash
# SSH to instance
ssh -i ./key ubuntu@$PUBLIC_IP

# Stop microk8s and restart k3s
sudo snap stop microk8s
sudo systemctl restart k3s

# Wait for k3s
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
sudo kubectl get nodes

# Manually install operator
sudo kubectl apply -f https://github.com/Dynatrace/dynatrace-operator/releases/latest/download/kubernetes.yaml
sudo kubectl create namespace dynatrace
sudo kubectl apply -n dynatrace -f https://github.com/Dynatrace/dynatrace-operator/releases/latest/download/kubernetes.yaml

# Continue deployment
sudo ACE_BOX_USER=ubuntu ace enable demo_auto_remediation_ansible
```

## Key Improvements

1. **Bulletproof Operator Installation**: Uses latest release with proper conflict resolution
2. **Terraform Compatibility**: Fixed provider version conflicts
3. **Security**: Proper secrets management with templates
4. **Documentation**: Complete deployment and troubleshooting guide
5. **Automation**: Handles k3s/microk8s conflicts automatically

This fixed version ensures reliable first-try deployments with proper Dynatrace integration.
