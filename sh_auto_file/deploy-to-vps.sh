#!/bin/bash

echo "📦 Sharothee Wedding Website - Local to VPS Deployment"
echo "======================================================"
echo "Preparing files and deploying to VPS: 31.97.189.238"
echo ""

# Configuration
VPS_IP="31.97.189.238"
VPS_USER="root"
VPS_PASS="..Tensorflow2022carbon@.."
LOCAL_PROJECT="i:/CodeStorm/VPS/ss/Sharothee-Wedding"
REMOTE_PATH="/tmp/sharothee-deployment"

echo "📋 Phase 1: Prepare Local Files"
echo "==============================="

# Navigate to project directory
cd "$LOCAL_PROJECT"

# Create deployment package
echo "Creating deployment package..."
zip -r sharothee-wedding-update.zip client/ -x "client/node_modules/*" "client/.next/*" "client/prisma/dev.db"

echo "✅ Deployment package created"

echo ""
echo "📋 Phase 2: Upload to VPS"
echo "========================="

# Upload files using scp (if sshpass is available)
if command -v sshpass >/dev/null 2>&1; then
    echo "Uploading files to VPS..."
    sshpass -p "$VPS_PASS" scp -o StrictHostKeyChecking=no sharothee-wedding-update.zip fresh-vps-deployment.sh $VPS_USER@$VPS_IP:/tmp/
    
    echo "✅ Files uploaded successfully"
    
    echo ""
    echo "📋 Phase 3: Execute Remote Deployment"
    echo "====================================="
    
    # Execute deployment on VPS
    sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP << 'ENDSSH'
        echo "🚀 Starting VPS deployment..."
        cd /tmp
        
        # Extract updated files
        unzip -o sharothee-wedding-update.zip
        
        # Make deployment script executable
        chmod +x fresh-vps-deployment.sh
        
        # Execute deployment
        ./fresh-vps-deployment.sh
        
        echo "🎉 Deployment completed!"
ENDSSH

else
    echo "❌ sshpass not available. Manual deployment required."
    echo ""
    echo "📋 Manual Deployment Steps:"
    echo "============================"
    echo "1. Upload files to VPS:"
    echo "   scp sharothee-wedding-update.zip fresh-vps-deployment.sh root@$VPS_IP:/tmp/"
    echo ""
    echo "2. SSH into VPS:"
    echo "   ssh root@$VPS_IP"
    echo "   Password: $VPS_PASS"
    echo ""
    echo "3. Extract and deploy:"
    echo "   cd /tmp"
    echo "   unzip -o sharothee-wedding-update.zip"
    echo "   chmod +x fresh-vps-deployment.sh"
    echo "   ./fresh-vps-deployment.sh"
fi

# Clean up local files
rm -f sharothee-wedding-update.zip

echo ""
echo "✅ Deployment process completed!"
echo ""
echo "🌐 Website should be available at:"
echo "   https://arvinwedsincia.com"
echo "   https://arvinwedsincia.com/admin"
