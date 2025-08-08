#!/bin/bash

# Application Deployment Script
# Run this script as the deploy user

set -e

APP_DIR="/var/www/wedding"
REPO_URL="https://github.com/syed-reza98/Sharothee-Wedding.git"
BRANCH="main"

echo "🚀 Starting application deployment..."

# Function to backup current deployment
backup_current() {
    if [ -d "$APP_DIR/current" ]; then
        echo "📦 Creating backup of current deployment..."
        sudo mv "$APP_DIR/current" "$APP_DIR/backup-$(date +%Y%m%d-%H%M%S)" || true
    fi
}

# Function to create environment file
create_env_file() {
    echo "⚙️ Creating environment configuration..."
    cat > "$APP_DIR/releases/$TIMESTAMP/.env.local" << EOF
# Database Configuration
DATABASE_URL="mysql://wedding_user:YOUR_DB_PASSWORD@localhost:3306/wedding_db"

# NextAuth Configuration
NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET_HERE"
NEXTAUTH_URL="https://yourdomain.com"

# Email Service (Resend)
RESEND_API_KEY="YOUR_RESEND_API_KEY"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="YOUR_CLOUDINARY_CLOUD_NAME"
CLOUDINARY_API_KEY="YOUR_CLOUDINARY_API_KEY"
CLOUDINARY_API_SECRET="YOUR_CLOUDINARY_API_SECRET"

# Production Environment
NODE_ENV="production"
PORT=3000
EOF

    echo "⚠️  Environment file created at: $APP_DIR/releases/$TIMESTAMP/.env.local"
    echo "⚠️  Please update the placeholder values with actual credentials!"
}

# Create timestamp for this deployment
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p "$APP_DIR/releases"
mkdir -p "$APP_DIR/logs"

# Clone fresh copy
echo "📥 Cloning repository..."
cd "$APP_DIR/releases"
git clone -b "$BRANCH" "$REPO_URL" "$TIMESTAMP"
cd "$TIMESTAMP"

# Move to client directory
cd client

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Create environment file with placeholders
create_env_file

echo "⚠️  IMPORTANT: Update environment variables before continuing!"
echo "Edit file: $APP_DIR/releases/$TIMESTAMP/client/.env.local"
read -p "Press Enter after updating environment variables..."

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npm run db:generate

# Run database migrations
echo "🗄️ Running database migrations..."
npm run db:push

# Build the application
echo "🏗️ Building application..."
npm run build

# Create PM2 ecosystem file
echo "⚙️ Creating PM2 configuration..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'wedding-website',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/wedding/current/client',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/www/wedding/logs/err.log',
    out_file: '/var/www/wedding/logs/out.log',
    log_file: '/var/www/wedding/logs/combined.log',
    time: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Test the application
echo "🧪 Testing application..."
npm run type-check

# Backup current deployment
backup_current

# Create symbolic link to current
echo "🔗 Creating symbolic link..."
ln -sfn "$APP_DIR/releases/$TIMESTAMP" "$APP_DIR/current"

# Copy PM2 config to app directory
cp ecosystem.config.js "$APP_DIR/"

# Restart application with PM2
echo "🔄 Restarting application..."
cd "$APP_DIR"

# Stop existing processes
pm2 delete wedding-website || true

# Start the application
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup | tail -1 | sudo bash || true

# Update Nginx configuration with correct domain
echo "🌐 Updating Nginx configuration..."
sudo sed -i 's/yourdomain.com/'"$DOMAIN"'/g' /etc/nginx/sites-available/wedding || true

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Show status
echo "📊 Application status:"
pm2 status
pm2 logs wedding-website --lines 10

echo "✅ Deployment complete!"
echo ""
echo "Application URL: https://$DOMAIN"
echo "Logs location: /var/www/wedding/logs/"
echo ""
echo "Next steps:"
echo "1. Setup SSL certificate: sudo certbot --nginx"
echo "2. Verify application is running: curl -I https://$DOMAIN"
echo "3. Monitor logs: pm2 logs wedding-website"

# Cleanup old releases (keep last 5)
echo "🧹 Cleaning up old releases..."
cd "$APP_DIR/releases"
ls -t | tail -n +6 | xargs -d '\n' rm -rf --

echo "🎉 Deployment successful!"