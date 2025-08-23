# Comprehensive Hostinger VPS Deployment Plan
## Sharothee Wedding Website Deployment Guide

This comprehensive guide covers the complete deployment of the Sharothee Wedding Website to Hostinger VPS with domain integration.

---

## 🎯 Overview

**Project**: Sharothee Wedding Website  
**Technology Stack**: Next.js 15.4.5 + MySQL + Prisma + NextAuth.js  
**Hosting**: Hostinger VPS  
**Domain**: Already pointed to VPS (DNS configured)  
**Application Type**: Full-stack Next.js (Server-side rendering required)

---

## 📋 Prerequisites & Requirements

### From Hostinger Dashboard
- [x] VPS instance (minimum 2GB RAM, 50GB storage recommended)
- [x] Domain pointing to VPS IP address
- [x] DNS records configured
- [x] SSH access credentials

### Required Credentials & API Keys
- [ ] Hostinger VPS SSH credentials
- [ ] MySQL database credentials (will be created)
- [ ] Cloudinary account (cloud_name, api_key, api_secret)
- [ ] Resend API key for email functionality
- [ ] NextAuth secret key (will be generated)

### GitHub Access
- [ ] Repository access (syed-reza98/Sharothee-Wedding)
- [ ] GitHub Personal Access Token (for CI/CD)
- [ ] SSH key for GitHub access on VPS

---

## 🔧 Phase 1: VPS Server Setup

### 1.1 Initial Server Configuration

```bash
# Connect to VPS via SSH
ssh root@your-vps-ip-address

# Update system packages
apt update && apt upgrade -y

# Install essential packages
apt install -y curl wget git unzip software-properties-common

# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# Verify installations
node --version  # Should be v20.x
npm --version   # Should be 10.x+
```

### 1.2 Install MySQL Server

```bash
# Install MySQL Server
apt install -y mysql-server

# Secure MySQL installation
mysql_secure_installation

# Create wedding database and user
mysql -u root -p
```

```sql
-- Create database
CREATE DATABASE wedding_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create dedicated user
CREATE USER 'wedding_user'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD_HERE';

-- Grant permissions
GRANT ALL PRIVILEGES ON wedding_db.* TO 'wedding_user'@'localhost';
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

### 1.3 Install PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Configure PM2 to start on system boot
pm2 startup
# Follow the instructions provided by the command
```

### 1.4 Install and Configure Nginx

```bash
# Install Nginx
apt install -y nginx

# Start and enable Nginx
systemctl start nginx
systemctl enable nginx

# Configure firewall (if needed)
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable
```

---

## 🌐 Phase 2: Domain & SSL Configuration

### 2.1 Nginx Configuration

Create nginx configuration file:

```bash
# Create site configuration
nano /etc/nginx/sites-available/sharothee-wedding
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL certificates (will be configured with Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Proxy to Next.js application
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
        proxy_redirect off;
    }

    # Handle static files
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # File upload size limit
    client_max_body_size 50M;
}
```

### 2.2 Enable Site and Install SSL

```bash
# Enable the site
ln -s /etc/nginx/sites-available/sharothee-wedding /etc/nginx/sites-enabled/

# Remove default site
rm /etc/nginx/sites-enabled/default

# Test nginx configuration
nginx -t

# Install Certbot for Let's Encrypt SSL
apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
certbot --nginx -d your-domain.com -d www.your-domain.com

# Test SSL renewal
certbot renew --dry-run

# Restart Nginx
systemctl restart nginx
```

---

## 💾 Phase 3: Application Deployment

### 3.1 Clone Repository

```bash
# Create application directory
mkdir -p /var/www/sharothee-wedding
cd /var/www/sharothee-wedding

# Clone repository
git clone https://github.com/syed-reza98/Sharothee-Wedding.git .

# Navigate to client directory
cd client

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate
```

### 3.2 Environment Configuration

```bash
# Create production environment file
nano .env.local
```

```bash
# Production Environment Variables
NODE_ENV=production

# Database Configuration
DATABASE_URL="mysql://wedding_user:STRONG_PASSWORD_HERE@localhost:3306/wedding_db"

# NextAuth Configuration
NEXTAUTH_SECRET="GENERATE_LONG_RANDOM_STRING_HERE"
NEXTAUTH_URL="https://your-domain.com"

# Email Configuration (Resend)
RESEND_API_KEY="re_your_resend_api_key_here"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

# Additional Security
ALLOWED_ORIGINS="https://your-domain.com,https://www.your-domain.com"
```

### 3.3 Database Setup

```bash
# Run database migrations
npx prisma db push

# Seed database (if seed file exists)
npx prisma db seed

# Verify database connection
npx prisma studio --port 5555
# Access via SSH tunnel: ssh -L 5555:localhost:5555 root@your-vps-ip
```

### 3.4 Build Application

```bash
# Build the Next.js application
npm run build

# Verify build completion
ls -la .next/
```

---

## 🚀 Phase 4: Process Management

### 4.1 PM2 Configuration

Create PM2 ecosystem file:

```bash
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'sharothee-wedding',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/sharothee-wedding/client',
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
    log_file: '/var/log/pm2/sharothee-wedding.log',
    time: true
  }]
};
```

### 4.2 Start Application

```bash
# Create log directory
mkdir -p /var/log/pm2

# Start application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Check application status
pm2 status
pm2 logs sharothee-wedding

# Monitor application
pm2 monit
```

---

## 🔄 Phase 5: CI/CD Pipeline Setup

### 5.1 GitHub Webhook Configuration

Create deployment script:

```bash
mkdir -p /opt/scripts
nano /opt/scripts/deploy.sh
```

```bash
#!/bin/bash

# Deployment script for Sharothee Wedding Website
LOG_FILE="/var/log/deployment.log"
APP_DIR="/var/www/sharothee-wedding"

echo "$(date): Starting deployment..." >> $LOG_FILE

cd $APP_DIR

# Pull latest changes
git pull origin main >> $LOG_FILE 2>&1

# Navigate to client directory
cd client

# Install dependencies
npm install >> $LOG_FILE 2>&1

# Generate Prisma client
npx prisma generate >> $LOG_FILE 2>&1

# Run database migrations
npx prisma db push >> $LOG_FILE 2>&1

# Build application
npm run build >> $LOG_FILE 2>&1

# Restart PM2 application
pm2 restart sharothee-wedding >> $LOG_FILE 2>&1

echo "$(date): Deployment completed!" >> $LOG_FILE
```

```bash
# Make script executable
chmod +x /opt/scripts/deploy.sh

# Test deployment script
/opt/scripts/deploy.sh
```

### 5.2 GitHub Actions Workflow (Optional)

Create GitHub Actions workflow file in repository:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Hostinger VPS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Deploy to VPS
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.VPS_HOST }}
        username: ${{ secrets.VPS_USERNAME }}
        key: ${{ secrets.VPS_SSH_KEY }}
        script: |
          /opt/scripts/deploy.sh
```

---

## 🔐 Phase 6: Security & Monitoring

### 6.1 Security Hardening

```bash
# Install fail2ban
apt install -y fail2ban

# Configure fail2ban for SSH
nano /etc/fail2ban/jail.local
```

```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
```

```bash
# Start fail2ban
systemctl start fail2ban
systemctl enable fail2ban

# Change SSH port (optional but recommended)
nano /etc/ssh/sshd_config
# Change Port 22 to Port 2222
systemctl restart ssh
```

### 6.2 Backup Strategy

Create backup script:

```bash
nano /opt/scripts/backup.sh
```

```bash
#!/bin/bash

BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
APP_DIR="/var/www/sharothee-wedding"

mkdir -p $BACKUP_DIR

# Database backup
mysqldump -u wedding_user -p wedding_db > $BACKUP_DIR/db_backup_$DATE.sql

# Application backup
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz $APP_DIR

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
```

```bash
# Make executable
chmod +x /opt/scripts/backup.sh

# Schedule daily backups
crontab -e
# Add: 0 2 * * * /opt/scripts/backup.sh
```

### 6.3 Monitoring Setup

```bash
# Install htop for process monitoring
apt install -y htop

# Setup log rotation
nano /etc/logrotate.d/sharothee-wedding
```

```
/var/log/pm2/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    copytruncate
}
```

---

## ✅ Phase 7: Testing & Validation

### 7.1 Application Testing

```bash
# Test application locally
curl -I http://localhost:3000

# Test through Nginx
curl -I https://your-domain.com

# Check SSL certificate
openssl s_client -connect your-domain.com:443 -servername your-domain.com

# Test database connection
cd /var/www/sharothee-wedding/client
npx prisma studio --port 5555
```

### 7.2 Performance Testing

```bash
# Install Apache Benchmark
apt install -y apache2-utils

# Test website performance
ab -n 100 -c 10 https://your-domain.com/

# Monitor server resources
htop
```

---

## 📊 Phase 8: Go-Live Checklist

### Pre-Launch Checklist
- [ ] VPS server configured and secured
- [ ] MySQL database setup with proper user permissions
- [ ] Domain pointing to VPS with SSL certificate installed
- [ ] Application built and running via PM2
- [ ] Nginx reverse proxy configured
- [ ] Environment variables properly set
- [ ] Database migrations completed
- [ ] Backup system configured
- [ ] Security measures implemented (fail2ban, firewall)
- [ ] Monitoring and logging setup

### Launch Validation
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] RSVP functionality works
- [ ] Contact forms submit successfully
- [ ] Admin dashboard accessible
- [ ] Image uploads working (Cloudinary)
- [ ] Email notifications working (Resend)
- [ ] SSL certificate valid and auto-renewing
- [ ] Performance meets requirements
- [ ] Mobile responsiveness verified

### Post-Launch Monitoring
- [ ] Monitor server resources (CPU, RAM, disk)
- [ ] Check application logs for errors
- [ ] Verify database performance
- [ ] Monitor website uptime
- [ ] Test backup restoration process
- [ ] Review security logs

---

## 🆘 Troubleshooting Guide

### Common Issues

#### Application Won't Start
```bash
# Check PM2 logs
pm2 logs sharothee-wedding

# Check port availability
netstat -tlnp | grep :3000

# Verify environment variables
cat /var/www/sharothee-wedding/client/.env.local
```

#### Database Connection Issues
```bash
# Test MySQL connection
mysql -u wedding_user -p wedding_db

# Check Prisma connection
cd /var/www/sharothee-wedding/client
npx prisma db push --preview-feature
```

#### SSL Certificate Issues
```bash
# Check certificate status
certbot certificates

# Force renewal
certbot renew --force-renewal
```

#### High Server Load
```bash
# Check resource usage
htop
df -h
free -m

# Check PM2 status
pm2 monit
```

---

## 📞 Support Contacts

### Technical Support
- **Hostinger VPS Support**: Available 24/7 via chat/email
- **Domain Management**: Hostinger control panel
- **Application Issues**: Development team

### Emergency Procedures
1. **Website Down**: Check PM2 status, restart if needed
2. **Database Issues**: Check MySQL service, review logs
3. **SSL Expiry**: Run `certbot renew`
4. **High Traffic**: Monitor resources, consider scaling

---

## 🔄 Maintenance Schedule

### Daily
- Monitor application logs
- Check server resources
- Verify website functionality

### Weekly
- Review backup logs
- Update system packages
- Check SSL certificate status

### Monthly
- Database optimization
- Security updates
- Performance review
- Backup restoration test

---

## 📈 Scaling Considerations

### Horizontal Scaling Options
- **Load Balancer**: Multiple VPS instances
- **CDN Integration**: Static asset delivery
- **Database Clustering**: MySQL replication
- **Container Deployment**: Docker + Kubernetes

### Vertical Scaling
- **VPS Upgrade**: Increase RAM/CPU via Hostinger panel
- **Storage Expansion**: Add additional disk space
- **Bandwidth Increase**: Upgrade network allocation

---

**Document Version**: 1.0  
**Last Updated**: January 2024  
**Next Review**: Quarterly

---

*This comprehensive deployment plan ensures a robust, secure, and scalable wedding website deployment on Hostinger VPS with proper monitoring, backup, and maintenance procedures.*