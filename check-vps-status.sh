#!/bin/bash

# VPS Status Check Script
VPS_IP="31.97.189.238"
VPS_USER="root"
VPS_PASS="..Tensorflow2022carbon@.."

echo "🔍 Checking VPS Status for Wedding Website Deployment"
echo "======================================================"

# Check if sshpass is available, if not try expect or plain ssh
command -v sshpass >/dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "Using sshpass for authentication..."
    sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP << 'ENDSSH'
        echo "✅ Connected to VPS successfully!"
        echo ""
        echo "📂 Current Directory:"
        pwd
        echo ""
        echo "📁 Directory Contents:"
        ls -la
        echo ""
        echo "💾 Disk Usage:"
        df -h
        echo ""
        echo "🔧 Service Status:"
        systemctl status nginx --no-pager || echo "Nginx not installed"
        systemctl status mysql --no-pager || echo "MySQL not installed"
        echo ""
        echo "🌐 Network Check:"
        curl -s https://arvinwedsincia.com/api/health || echo "Website not responding"
        echo ""
        echo "📋 Existing Project Check:"
        ls -la /var/www/ 2>/dev/null || echo "No /var/www directory"
ENDSSH
else
    echo "sshpass not available. Manual SSH required."
    echo "Command to run: ssh $VPS_USER@$VPS_IP"
    echo "Password: $VPS_PASS"
fi
