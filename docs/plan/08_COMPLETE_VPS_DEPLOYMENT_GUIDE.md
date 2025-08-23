# 🚀 Complete Hostinger VPS Deployment Guide
## Sharothee Wedding Website - Production Deployment

**Project:** Sharothee Wedding Website  
**Domain:** arvinwedsincia.com  
**VPS:** Hostinger KVM 1 Server (31.97.189.238)  
**Date Created:** August 15, 2025  
**Status:** Production Ready  

---

## 📋 Table of Contents

1. [Prerequisites & Credentials](#prerequisites--credentials)
2. [VPS Server Setup](#vps-server-setup)
3. [System Configuration](#system-configuration)
4. [Database Setup](#database-setup)
5. [Application Deployment](#application-deployment)
6. [Web Server Configuration](#web-server-configuration)
7. [SSL Certificate Installation](#ssl-certificate-installation)
8. [Process Management](#process-management)
9. [Security Hardening](#security-hardening)
10. [Testing & Validation](#testing--validation)
11. [Monitoring & Maintenance](#monitoring--maintenance)
12. [Troubleshooting Guide](#troubleshooting-guide)

---

## 🔑 Prerequisites & Credentials

### Required Information
Before starting, ensure you have:

**VPS Credentials:**
- **Server IP:** `31.97.189.238`
- **SSH Username:** `root`
- **SSH Password:** `..Tensorflow2022carbon@..`
- **Domain:** `arvinwedsincia.com`
- **SSH Key Passphrase:** `salman457`

**API Keys & Services:**
- **Resend API Key:** `re_your_resend_api_key_here`
- **Cloudinary Cloud Name:** `your-cloudinary-cloud-name`
- **Cloudinary API Key:** `your-cloudinary-api-key`
- **Cloudinary API Secret:** `your-cloudinary-api-secret`

**Database Credentials (will be created):**
- **MySQL Root Password:** `R00t@MySQL2025!Secure`
- **Database Name:** `wedding_db`
- **Database User:** `wedding_user`
- **Database Password:** `W3dd1ng@ArvinIncia2025!Secure`

### SSH Key Setup
```bash
# If using SSH key authentication
ssh-add ~/.ssh/id_ed25519
# Enter passphrase: salman457
```

---

## 🖥️ VPS Server Setup

### Step 1: Initial Server Connection
```bash
# Connect to VPS
ssh root@31.97.189.238
# Enter password: ..Tensorflow2022carbon@..

# Verify server information
hostnamectl
uname -a
df -h
free -h
```

### Step 2: System Updates
```bash
# Update package lists
apt update

# Upgrade all packages
apt upgrade -y

# Install essential packages
apt install -y curl wget git unzip software-properties-common
```

**⏱️ Expected Time:** 5-10 minutes  
**💾 Wait:** Allow 60 seconds for command completion before proceeding

---

## ⚙️ System Configuration

### Step 3: Install Node.js 20.x
```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Install Node.js
apt-get install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version
```

### Step 4: Install MySQL Server
```bash
# Install MySQL
apt install -y mysql-server

# Start and enable MySQL
systemctl start mysql
systemctl enable mysql

# Secure MySQL installation
mysql_secure_installation
```

**MySQL Security Setup:**
- Root password: `R00t@MySQL2025!Secure`
- Remove anonymous users: `Y`
- Disallow root login remotely: `Y`
- Remove test database: `Y`
- Reload privilege tables: `Y`

### Step 5: Install Additional Services
```bash
# Install Nginx web server
apt install -y nginx

# Install PM2 globally
npm install -g pm2

# Install Certbot for SSL
apt install -y certbot python3-certbot-nginx

# Start and enable Nginx
systemctl start nginx
systemctl enable nginx
```

**⏱️ Expected Time:** 10-15 minutes  
**💾 Wait:** Allow 60 seconds between each major installation

---

## 🗄️ Database Setup

### Step 6: Create Database and User
```bash
# Access MySQL as root
mysql -u root -p
# Enter password: R00t@MySQL2025!Secure
```

```sql
-- Create database
CREATE DATABASE wedding_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user with secure password
CREATE USER 'wedding_user'@'localhost' IDENTIFIED BY 'W3dd1ng@ArvinIncia2025!Secure';

-- Grant privileges
GRANT ALL PRIVILEGES ON wedding_db.* TO 'wedding_user'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Verify database creation
SHOW DATABASES;

-- Exit MySQL
EXIT;
```

### Step 7: Test Database Connection
```bash
# Test connection
mysql -u wedding_user -p'W3dd1ng@ArvinIncia2025!Secure' -e "SELECT 1;"

# Should return: 1
```

**⏱️ Expected Time:** 3-5 minutes

---

## 📦 Application Deployment

### Step 8: Clone Repository
```bash
# Create application directory
mkdir -p /var/www/wedding
cd /var/www/wedding

# Clone repository
git clone https://github.com/syed-reza98/Sharothee-Wedding.git .

# Navigate to client directory
cd client
```

### Step 9: Environment Configuration
```bash
# Create production environment file
cat > .env.local << 'EOF'
# Database Configuration
DATABASE_URL="mysql://wedding_user:W3dd1ng@ArvinIncia2025!Secure@localhost:3306/wedding_db"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secure-nextauth-secret-key-2025-wedding"
NEXTAUTH_URL="https://arvinwedsincia.com"

# Email Service (Resend)
RESEND_API_KEY="re_your_resend_api_key_here"

# Media Service (Cloudinary)
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# Admin Credentials
ADMIN_EMAIL="admin@arvinwedsincia.com"
ADMIN_PASSWORD="SecureAdmin2025!"

# Application Configuration
NODE_ENV="production"
PORT="3000"
EOF

# Copy for build process
cp .env.local .env.production
```

### Step 10: Update Prisma Schema for MySQL
```bash
# Update Prisma schema to use MySQL
sed -i 's/provider = "sqlite"/provider = "mysql"/' prisma/schema.prisma

# Verify the change
grep -n "provider" prisma/schema.prisma
```

### Step 11: Install Dependencies and Build
```bash
# Install npm dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed database with test data
npx prisma db seed

# Build application for production
npm run build
```

**⏱️ Expected Time:** 8-12 minutes  
**💾 Wait:** Allow 60 seconds for each command completion

---

## 🌐 Web Server Configuration

### Step 12: Create Nginx Configuration
```bash
# Create Nginx site configuration
cat > /etc/nginx/sites-available/wedding << 'EOF'
server {
    listen 80;
    server_name arvinwedsincia.com www.arvinwedsincia.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name arvinwedsincia.com www.arvinwedsincia.com;

    # SSL Configuration (will be added by Certbot)
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Static file caching
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /images/ {
        expires 30d;
        add_header Cache-Control "public";
    }

    # Main application proxy
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/wedding /etc/nginx/sites-enabled/

# Remove default site
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

**⏱️ Expected Time:** 3-5 minutes

---

## 🔒 SSL Certificate Installation

### Step 13: Install Let's Encrypt Certificate
```bash
# Install SSL certificate
certbot --nginx -d arvinwedsincia.com -d www.arvinwedsincia.com \
  --non-interactive \
  --agree-tos \
  --email admin@arvinwedsincia.com

# Verify SSL installation
certbot certificates

# Test automatic renewal
certbot renew --dry-run
```

### Step 14: Configure SSL Auto-Renewal
```bash
# Add cron job for certificate renewal
echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -

# Verify cron job
crontab -l
```

**⏱️ Expected Time:** 2-3 minutes

---

## 🔄 Process Management

### Step 15: Create PM2 Ecosystem Configuration
```bash
# Create PM2 configuration file
cat > /var/www/wedding/client/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'sharothee-wedding',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/wedding/client',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/sharothee-wedding-error.log',
    out_file: '/var/log/pm2/sharothee-wedding-combined.log',
    log_file: '/var/log/pm2/sharothee-wedding-combined.log',
    time: true
  }]
};
EOF

# Create log directory
mkdir -p /var/log/pm2
```

### Step 16: Start Application with PM2
```bash
# Start application
cd /var/www/wedding/client
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Generate startup script
pm2 startup systemd

# Enable PM2 startup
systemctl enable pm2-root

# Check PM2 status
pm2 status
```

**⏱️ Expected Time:** 2-3 minutes

---

## 🛡️ Security Hardening

### Step 17: Configure Firewall
```bash
# Enable UFW firewall
ufw --force enable

# Allow SSH
ufw allow OpenSSH

# Allow HTTP and HTTPS
ufw allow 'Nginx Full'

# Check firewall status
ufw status
```

### Step 18: Install Fail2Ban (Optional)
```bash
# Install Fail2Ban
apt install -y fail2ban

# Create custom configuration
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log
EOF

# Start and enable Fail2Ban
systemctl start fail2ban
systemctl enable fail2ban
```

**⏱️ Expected Time:** 3-5 minutes

---

## ✅ Testing & Validation

### Step 19: Health Check Testing
```bash
# Test local application
curl -I http://localhost:3000

# Test external domain
curl -I https://arvinwedsincia.com

# Test health endpoint
curl -s https://arvinwedsincia.com/api/health | jq .

# Test admin endpoint
curl -I https://arvinwedsincia.com/admin
```

### Step 20: Comprehensive Website Testing
```bash
echo "🎯 COMPREHENSIVE WEBSITE TESTING"
echo "================================"

echo "1. Testing homepage..."
curl -s -o /dev/null -w '%{http_code}\n' https://arvinwedsincia.com

echo "2. Testing events page..."
curl -s -o /dev/null -w '%{http_code}\n' https://arvinwedsincia.com/events

echo "3. Testing RSVP page..."
curl -s -o /dev/null -w '%{http_code}\n' https://arvinwedsincia.com/rsvp

echo "4. Testing admin panel..."
curl -s -o /dev/null -w '%{http_code}\n' https://arvinwedsincia.com/admin

echo "5. Testing API endpoints..."
curl -s https://arvinwedsincia.com/api/health
curl -s https://arvinwedsincia.com/api/guests | head -100

echo "6. Testing SSL certificate..."
echo | openssl s_client -servername arvinwedsincia.com -connect arvinwedsincia.com:443 2>/dev/null | openssl x509 -noout -dates
```

### Step 21: Performance Testing
```bash
# Check application performance
echo "🚀 PERFORMANCE TESTING"
echo "====================="

# Test response times
time curl -s https://arvinwedsincia.com > /dev/null

# Check memory usage
pm2 monit

# Check disk usage
df -h

# Check system load
uptime
```

**⏱️ Expected Time:** 5-8 minutes

---

## 📊 Monitoring & Maintenance

### Step 22: Setup Monitoring
```bash
# Create monitoring script
cat > /opt/scripts/health-check.sh << 'EOF'
#!/bin/bash

HEALTH_URL="https://arvinwedsincia.com/api/health"
LOG_FILE="/var/log/health-check.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Test health endpoint
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ $RESPONSE != "200" ]; then
    echo "[$DATE] CRITICAL: Health check failed with status: $RESPONSE" >> $LOG_FILE
    # Restart application
    pm2 restart sharothee-wedding
    echo "[$DATE] ACTION: Restarted application" >> $LOG_FILE
else
    echo "[$DATE] OK: Health check passed" >> $LOG_FILE
fi
EOF

# Make script executable
chmod +x /opt/scripts/health-check.sh

# Create scripts directory
mkdir -p /opt/scripts

# Add to cron for every 5 minutes
echo "*/5 * * * * /opt/scripts/health-check.sh" | crontab -
```

### Step 23: Backup Configuration
```bash
# Create backup script
cat > /opt/scripts/backup.sh << 'EOF'
#!/bin/bash

BACKUP_DIR="/var/backups/wedding"
DATE=$(date '+%Y%m%d_%H%M%S')

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
mysqldump -u wedding_user -p'W3dd1ng@ArvinIncia2025!Secure' wedding_db > $BACKUP_DIR/wedding_db_$DATE.sql

# Backup application files
tar -czf $BACKUP_DIR/wedding_app_$DATE.tar.gz /var/www/wedding/client

# Cleanup old backups (keep last 7 days)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

# Make script executable
chmod +x /opt/scripts/backup.sh

# Schedule daily backups at 2 AM
echo "0 2 * * * /opt/scripts/backup.sh" | crontab -
```

**⏱️ Expected Time:** 5-7 minutes

---

## 🔧 Troubleshooting Guide

### Common Issues and Solutions

#### Application Won't Start
```bash
# Check PM2 status
pm2 status

# Check PM2 logs
pm2 logs sharothee-wedding

# Restart application
pm2 restart sharothee-wedding

# Check Node.js version
node --version  # Should be v20.x.x
```

#### Database Connection Issues
```bash
# Test database connection
mysql -u wedding_user -p'W3dd1ng@ArvinIncia2025!Secure' wedding_db

# Check MySQL status
systemctl status mysql

# Restart MySQL
systemctl restart mysql

# Check Prisma connection
cd /var/www/wedding/client
npx prisma db push
```

#### Nginx Issues
```bash
# Test Nginx configuration
nginx -t

# Check Nginx status
systemctl status nginx

# Restart Nginx
systemctl restart nginx

# Check Nginx logs
tail -f /var/log/nginx/error.log
```

#### SSL Certificate Issues
```bash
# Check certificate status
certbot certificates

# Renew certificates manually
certbot renew

# Test SSL configuration
echo | openssl s_client -servername arvinwedsincia.com -connect arvinwedsincia.com:443
```

#### Build Issues
```bash
# Clear build cache
cd /var/www/wedding/client
rm -rf .next node_modules

# Reinstall dependencies
npm install

# Regenerate Prisma client
npx prisma generate

# Rebuild application
npm run build
```

---

## 📈 Performance Optimization

### Database Optimization
```sql
-- Connect to MySQL and optimize
mysql -u root -p

-- Optimize wedding database
USE wedding_db;
OPTIMIZE TABLE Guest, Event, RSVP, MediaItem;

-- Check table status
SHOW TABLE STATUS;
```

### Application Optimization
```bash
# Enable PM2 clustering for better performance
pm2 delete sharothee-wedding
pm2 start ecosystem.config.js --instances 2

# Monitor performance
pm2 monit
```

### Nginx Optimization
```bash
# Update Nginx for better performance
cat >> /etc/nginx/nginx.conf << 'EOF'
# Worker processes
worker_processes auto;
worker_connections 1024;

# Enable gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1000;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
EOF

# Restart Nginx
systemctl restart nginx
```

---

## 🎯 Final Validation Checklist

### Pre-Production Checklist
- [ ] **VPS Setup Complete**: Ubuntu 24.04 LTS configured
- [ ] **Node.js Installed**: Version 20.x running
- [ ] **MySQL Database**: wedding_db created and accessible
- [ ] **Application Built**: Next.js build successful
- [ ] **PM2 Running**: Application process managed
- [ ] **Nginx Configured**: Reverse proxy setup
- [ ] **SSL Certificate**: HTTPS enabled and working
- [ ] **Firewall Active**: Security rules applied
- [ ] **Domain Accessible**: https://arvinwedsincia.com loads

### Functional Testing
- [ ] **Homepage Works**: Main page loads correctly
- [ ] **Navigation**: All menu items functional
- [ ] **RSVP System**: Guest code validation works
- [ ] **Admin Panel**: Authentication and dashboard accessible
- [ ] **API Endpoints**: Health checks and data endpoints respond
- [ ] **Mobile Responsive**: Site works on mobile devices
- [ ] **Performance**: Page load times under 2 seconds

### Admin Credentials
- **Email**: `admin@arvinwedsincia.com`
- **Password**: `SecureAdmin2025!`
- **Access**: https://arvinwedsincia.com/admin

---

## 📞 Support Information

### Technical Support
- **VPS Provider**: Hostinger Support (24/7 chat)
- **Repository**: https://github.com/syed-reza98/Sharothee-Wedding
- **Documentation**: Complete guides in `/docs` directory

### Wedding Contact
- **Primary Email**: hello@inciaandarvins.wedding
- **Phone**: +880 1234-567890
- **Location**: Dhaka, Bangladesh

### Emergency Contacts
- **Server Issues**: Contact Hostinger support immediately
- **Application Issues**: Check PM2 logs and restart application
- **Domain Issues**: Verify DNS settings and SSL certificates

---

## 🎉 Deployment Summary

### Infrastructure
- **Server**: Hostinger KVM 1 (4GB RAM, 50GB SSD)
- **Operating System**: Ubuntu 24.04 LTS
- **Domain**: arvinwedsincia.com with SSL
- **Database**: MySQL 8.0 with optimized configuration
- **Web Server**: Nginx with security headers
- **Process Manager**: PM2 with auto-restart
- **Security**: UFW firewall and Fail2Ban protection

### Application
- **Framework**: Next.js 15.4.5 with TypeScript
- **Authentication**: NextAuth.js with credentials
- **Database ORM**: Prisma with MySQL
- **Email Service**: Resend integration ready
- **Media Storage**: Cloudinary integration ready
- **Performance**: Optimized build and caching

### Total Deployment Time
**Estimated**: 45-60 minutes  
**Actual**: May vary based on network speed and server performance

---

**🌐 Live Website**: https://arvinwedsincia.com  
**🔐 Admin Panel**: https://arvinwedsincia.com/admin  
**💍 Status**: Ready for Incia & Arvin's Wedding!

---

*Last Updated: August 15, 2025*  
*Version: 1.0*  
*Deployment Guide: Complete*
