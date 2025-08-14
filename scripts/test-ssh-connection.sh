#!/bin/bash

# Test SSH Connection to Hostinger VPS
# This script helps diagnose SSH connectivity issues

set -euo pipefail

# VPS Configuration
VPS_HOST="${VPS_HOST:-31.97.189.238}"
VPS_PORT="${VPS_PORT:-22}"
VPS_USER="${VPS_USER:-root}"
VPS_PASSWORD="${VPS_PASSWORD:-..Tensorflow2022carbon@..}"

echo "=========================================="
echo "SSH Connection Test for Hostinger VPS"
echo "=========================================="
echo "Host: ${VPS_HOST}"
echo "Port: ${VPS_PORT}"
echo "User: ${VPS_USER}"
echo "=========================================="

# Install sshpass if not available
if ! command -v sshpass &> /dev/null; then
    echo "Installing sshpass..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get update && sudo apt-get install -y sshpass netcat-traditional
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install hudochenkov/sshpass/sshpass
    else
        echo "Please install sshpass manually for your operating system"
        exit 1
    fi
fi

# Test 1: Basic connectivity
echo "1. Testing basic connectivity..."
if ping -c 3 "${VPS_HOST}" > /dev/null 2>&1; then
    echo "✅ Ping successful - VPS is reachable"
else
    echo "❌ Ping failed - VPS may be unreachable"
fi

# Test 2: SSH port accessibility
echo "2. Testing SSH port accessibility..."
if nc -zv "${VPS_HOST}" "${VPS_PORT}" 2>&1 | grep -q "succeeded\|Connected"; then
    echo "✅ SSH port ${VPS_PORT} is accessible"
else
    echo "❌ SSH port ${VPS_PORT} is not accessible"
fi

# Test 3: SSH banner
echo "3. Getting SSH server banner..."
timeout 5 bash -c "echo '' | telnet ${VPS_HOST} ${VPS_PORT}" 2>/dev/null | head -5 || echo "No SSH banner received"

# Test 4: SSH connection with password
echo "4. Testing SSH connection with password authentication..."
export SSHPASS="${VPS_PASSWORD}"

# Verbose SSH attempt
echo "Attempting SSH connection..."
if sshpass -e ssh -v -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
    -o ConnectTimeout=30 -o PasswordAuthentication=yes -o PubkeyAuthentication=no \
    -o PreferredAuthentications=password \
    "${VPS_USER}@${VPS_HOST}" "echo 'SSH Connection successful!' && hostname && whoami" 2>&1; then
    echo "✅ SSH connection successful!"
else
    echo "❌ SSH connection failed!"
    echo ""
    echo "Common fixes:"
    echo "1. Login to VPS via Hostinger control panel console"
    echo "2. Edit SSH configuration: sudo nano /etc/ssh/sshd_config"
    echo "3. Enable password authentication: PasswordAuthentication yes"
    echo "4. Enable root login: PermitRootLogin yes"
    echo "5. Restart SSH service: sudo systemctl restart ssh"
    echo "6. Check firewall: sudo ufw status"
    echo ""
    echo "SSH configuration should include:"
    echo "PasswordAuthentication yes"
    echo "PermitRootLogin yes"
    echo "PubkeyAuthentication yes"
    echo "AuthorizedKeysFile .ssh/authorized_keys"
fi

echo "=========================================="
echo "SSH Connection Test Complete"
echo "=========================================="