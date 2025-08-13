#!/bin/bash

echo "🚀 Sharothee Wedding Website - Complete VPS Deployment"
echo "====================================================="

# Set variables
VPS_IP="31.97.189.238"
VPS_USER="root"
VPS_PASSWORD="..Tensorflow2022carbon@.."
DOMAIN="arvinwedsincia.com"
PROJECT_PATH="/var/www/Sharothee-Wedding"
CLIENT_PATH="$PROJECT_PATH/client"

echo "📋 Step 1: Preparing local build..."
# Clean and build locally first
echo "Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

echo "Installing dependencies..."
npm install

echo "Generating Prisma client..."
npx prisma generate

echo "Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors before deployment."
    exit 1
fi

echo "✅ Local build successful!"
echo ""
echo "📋 Step 2: Uploading to VPS..."

# Create deployment package
echo "Creating deployment package..."
tar -czf sharothee-wedding-deploy.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=.next \
    --exclude=out \
    --exclude=prisma/dev.db \
    .

echo "Uploading to VPS..."
scp sharothee-wedding-deploy.tar.gz root@$VPS_IP:/tmp/

echo ""
echo "📋 Step 3: Connecting to VPS for deployment..."
echo "You will need to enter the password: $VPS_PASSWORD"

# SSH into VPS and run deployment commands
ssh root@$VPS_IP << 'ENDSSH'
echo "🔧 Setting up VPS environment..."

# Update system
apt update && apt upgrade -y

# Install Node.js 20.x
echo "Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# Install MySQL
echo "Installing MySQL..."
apt install -y mysql-server nginx

# Install PM2
echo "Installing PM2..."
npm install -g pm2

# Create project directory
echo "Setting up project directory..."
mkdir -p /var/www/Sharothee-Wedding/client
cd /var/www/Sharothee-Wedding/client

# Extract uploaded files
echo "Extracting project files..."
tar -xzf /tmp/sharothee-wedding-deploy.tar.gz
rm /tmp/sharothee-wedding-deploy.tar.gz

# Install dependencies
echo "Installing production dependencies..."
npm ci --production

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

echo "✅ VPS setup completed!"
echo "📋 Next steps:"
echo "1. Configure MySQL database"
echo "2. Set up environment variables"
echo "3. Run database migrations"
echo "4. Start the application"
echo "5. Configure Nginx"
echo "6. Set up SSL"

ENDSSH

echo ""
echo "✅ Deployment package uploaded successfully!"
echo "🔧 Manual steps required on VPS:"
echo "1. SSH into VPS: ssh root@$VPS_IP"
echo "2. Run MySQL setup script"
echo "3. Configure environment variables"
echo "4. Complete deployment"
