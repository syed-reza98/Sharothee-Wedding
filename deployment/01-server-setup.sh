#!/bin/bash

# Hostinger VPS Initial Server Setup Script
# Run this script as root on your fresh Hostinger VPS

set -e

echo "🚀 Starting Hostinger VPS setup for Sharothee Wedding Website..."

# Update system packages
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install essential packages
echo "🔧 Installing essential packages..."
apt install -y curl wget git nginx mysql-server ufw fail2ban

# Install Node.js 18.x
echo "📥 Installing Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Verify installations
echo "✅ Verifying installations..."
node --version
npm --version
nginx -v
mysql --version

# Install PM2 globally
echo "🔄 Installing PM2 process manager..."
npm install -g pm2

# Configure MySQL
echo "🗄️ Configuring MySQL..."
# Non-interactive MySQL hardening
mysql -u root <<EOF
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'CHANGE_THIS_ROOT_PASSWORD';
DELETE FROM mysql.user WHERE User='';
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';
FLUSH PRIVILEGES;
EOF

# Create MySQL database and user
echo "📊 Creating wedding database..."
mysql -u root -p << 'EOF'
CREATE DATABASE IF NOT EXISTS wedding_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'wedding_user'@'localhost' IDENTIFIED BY 'CHANGE_THIS_PASSWORD';
GRANT ALL PRIVILEGES ON wedding_db.* TO 'wedding_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
EOF

# Configure UFW Firewall
echo "🔥 Configuring firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw allow 3000  # For development if needed
ufw --force enable

# Create deployment user
echo "👤 Creating deployment user..."
adduser --disabled-password --gecos "" deploy
usermod -aG sudo deploy
mkdir -p /home/deploy/.ssh
cp /root/.ssh/authorized_keys /home/deploy/.ssh/ || echo "⚠️ No SSH keys found to copy"
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys

# Create application directory
echo "📁 Creating application directory..."
mkdir -p /var/www/wedding
chown deploy:deploy /var/www/wedding

# Configure Nginx basic setup
echo "🌐 Setting up basic Nginx configuration..."
cat > /etc/nginx/sites-available/wedding << 'EOF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect all HTTP traffic to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL configuration (will be configured later with Let's Encrypt)
    # ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
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
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
EOF

# Enable the site (don't start yet, need SSL first)
ln -sf /etc/nginx/sites-available/wedding /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
nginx -t

# Install Certbot for SSL certificates
echo "🔒 Installing Certbot for SSL..."
apt install -y certbot python3-certbot-nginx

# Configure automatic renewals
echo "⏰ Setting up automatic SSL renewal..."
crontab -l | { cat; echo "0 12 * * * /usr/bin/certbot renew --quiet"; } | crontab -

# Setup log rotation
echo "📝 Configuring log rotation..."
cat > /etc/logrotate.d/wedding << 'EOF'
/var/www/wedding/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 deploy deploy
    postrotate
        pm2 reload all
    endscript
}
EOF

# Create log directory
mkdir -p /var/www/wedding/logs
chown deploy:deploy /var/www/wedding/logs

echo "✅ Server setup complete!"
echo ""
echo "Next steps:"
echo "1. Update the domain name in /etc/nginx/sites-available/wedding"
echo "2. Run SSL certificate setup: sudo certbot --nginx"
echo "3. Switch to deploy user: su - deploy"
echo "4. Run the application deployment script"
echo ""
echo "Database created: wedding_db"
echo "Database user: wedding_user"
echo "⚠️ Remember to change the database password!"