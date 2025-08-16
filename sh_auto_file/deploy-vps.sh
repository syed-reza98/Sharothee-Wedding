#!/bin/bash

echo "🚀 VPS Deployment Script for Sharothee Wedding Website"
echo "======================================================"

# System update
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 20.x
echo "📦 Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs mysql-server nginx

# Secure MySQL
echo "🔒 Setting up MySQL database..."
mysql_secure_installation

# Create wedding database
mysql -u root -p << EOF
CREATE DATABASE wedding_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wedding_user'@'localhost' IDENTIFIED BY 'W3dd1ng@ArvinIncia2025!';
GRANT ALL PRIVILEGES ON wedding_db.* TO 'wedding_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
EOF

# Install PM2
echo "⚙️ Installing PM2..."
npm install -g pm2

# Setup application
echo "🏗️ Setting up application..."
cd /var/www/Sharothee-Wedding/client
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run build

# Start with PM2
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Configure Nginx
echo "🌐 Configuring Nginx..."
cp ../nginx-site.conf /etc/nginx/sites-available/arvinwedsincia.com
ln -s /etc/nginx/sites-available/arvinwedsincia.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

# Install SSL
echo "🔒 Installing SSL certificate..."
apt install -y certbot python3-certbot-nginx
certbot --nginx -d arvinwedsincia.com -d www.arvinwedsincia.com --non-interactive --agree-tos --email admin@arvinwedsincia.com

echo "✅ Deployment completed!"
echo "🌐 Website: https://arvinwedsincia.com"
echo "🔧 Admin: https://arvinwedsincia.com/admin"
