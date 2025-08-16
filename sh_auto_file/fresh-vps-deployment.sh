#!/bin/bash

echo "🚀 Sharothee Wedding Website - Fresh VPS Deployment"
echo "==================================================="
echo "Target VPS: 31.97.189.238 (arvinwedsincia.com)"
echo "Deployment Date: $(date)"
echo ""

# Configuration
VPS_IP="31.97.189.238"
VPS_USER="root"
DOMAIN="arvinwedsincia.com"
DB_NAME="wedding_db"
DB_USER="wedding_user"
DB_PASSWORD="W3dd1ng@ArvinIncia2025!Secure"
DB_ROOT_PASSWORD="W3dd1ng@ArvinIncia2025!Secure"
PROJECT_PATH="/var/www/Sharothee-Wedding"

echo "📋 Phase 1: Clean Previous Deployment"
echo "====================================="

# Stop existing services
pm2 stop all 2>/dev/null || echo "No PM2 processes to stop"
pm2 delete all 2>/dev/null || echo "No PM2 processes to delete"

# Remove old project files
rm -rf $PROJECT_PATH
rm -f /var/www/Sharothee-Wedding.zip
rm -f /var/www/*.sql

# Clean nginx configuration
rm -f /etc/nginx/sites-enabled/$DOMAIN
rm -f /etc/nginx/sites-available/$DOMAIN

echo "✅ Previous deployment cleaned"

echo ""
echo "📋 Phase 2: System Dependencies"
echo "==============================="

# Update system
apt update && apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs mysql-server nginx git curl

# Install PM2 globally
npm install -g pm2

# Verify installations
echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "PM2 version: $(pm2 --version)"

echo "✅ System dependencies installed"

echo ""
echo "📋 Phase 3: MySQL Database Setup"
echo "================================"

# Start MySQL service
systemctl start mysql
systemctl enable mysql

# Set root password and create database
mysql -u root << EOF
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$DB_ROOT_PASSWORD';
CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
EOF

# Test database connection
mysql -u $DB_USER -p$DB_PASSWORD -e "USE $DB_NAME; SELECT 'Database connection successful' as status;"

echo "✅ MySQL database configured"

echo ""
echo "📋 Phase 4: Clone Updated Project"
echo "================================"

# Create project directory
mkdir -p /var/www
cd /var/www

# Clone project (assuming it's already pushed to GitHub)
git clone https://github.com/syed-reza98/Sharothee-Wedding.git
cd Sharothee-Wedding/client

# Set proper permissions
chown -R root:root /var/www/Sharothee-Wedding
chmod -R 755 /var/www/Sharothee-Wedding

echo "✅ Project cloned and permissions set"

echo ""
echo "📋 Phase 5: Application Setup"
echo "============================="

# Copy production environment
cp .env.production .env

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed database with test data
npm run db:seed

# Build application
npm run build

echo "✅ Application built and configured"

echo ""
echo "📋 Phase 6: PM2 Process Management"
echo "=================================="

# Create PM2 ecosystem config
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'sharothee-wedding',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/Sharothee-Wedding/client',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/sharothee-wedding-error.log',
    out_file: '/var/log/pm2/sharothee-wedding-out.log',
    log_file: '/var/log/pm2/sharothee-wedding-combined.log',
    time: true
  }]
};
EOF

# Start application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ PM2 configured and application started"

echo ""
echo "📋 Phase 7: Nginx Configuration"
echo "==============================="

# Create Nginx configuration
cat > /etc/nginx/sites-available/$DOMAIN << 'EOF'
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name arvinwedsincia.com www.arvinwedsincia.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS Configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name arvinwedsincia.com www.arvinwedsincia.com;

    # SSL Configuration (will be updated by Certbot)
    ssl_certificate /etc/letsencrypt/live/arvinwedsincia.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/arvinwedsincia.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Reverse proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_buffering off;
    }

    # Static files caching
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, immutable";
    }

    # API routes
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/

# Test and reload Nginx
nginx -t && systemctl reload nginx

echo "✅ Nginx configured"

echo ""
echo "📋 Phase 8: SSL Certificate"
echo "=========================="

# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

echo "✅ SSL certificate configured"

echo ""
echo "📋 Phase 9: Firewall Configuration"
echo "=================================="

# Configure UFW firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "✅ Firewall configured"

echo ""
echo "📋 Phase 10: Health Check & Verification"
echo "========================================"

# Wait for application to start
sleep 10

# Check application status
echo "Application Status:"
pm2 status

echo ""
echo "Service Status:"
systemctl status nginx --no-pager
systemctl status mysql --no-pager

echo ""
echo "Health Check:"
curl -s https://$DOMAIN/api/health | jq . || echo "Health check failed"

echo ""
echo "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!"
echo "===================================="
echo ""
echo "🌐 Website URLs:"
echo "   Main Site: https://$DOMAIN"
echo "   Admin Panel: https://$DOMAIN/admin"
echo "   Health Check: https://$DOMAIN/api/health"
echo ""
echo "🔑 Admin Credentials:"
echo "   Email: admin@arvinwedsincia.com"
echo "   Password: Adm1n@ArvinIncia2025!Secure"
echo ""
echo "📊 Monitoring Commands:"
echo "   pm2 status"
echo "   pm2 logs sharothee-wedding"
echo "   systemctl status nginx"
echo "   systemctl status mysql"
echo ""
echo "✅ Fresh deployment completed successfully!"
