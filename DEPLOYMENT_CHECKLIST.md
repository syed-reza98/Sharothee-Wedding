# Quick Deployment Checklist
## Hostinger VPS Deployment - Action Items

This is a condensed checklist for deploying the Sharothee Wedding Website to Hostinger VPS.

---

## 🔑 Required Credentials & Information

### From Hostinger Dashboard
- [ ] **VPS IP Address**: `_____________________`
- [ ] **SSH Username**: `root` (default) or `_____________________`
- [ ] **SSH Password/Key**: `_____________________`
- [ ] **Domain Name**: `_____________________` (already pointing to VPS)

### API Keys & Services
- [ ] **Cloudinary Cloud Name**: `_____________________`
- [ ] **Cloudinary API Key**: `_____________________`
- [ ] **Cloudinary API Secret**: `_____________________`
- [ ] **Resend API Key**: `re_____________________`

### Generated During Setup
- [ ] **MySQL Root Password**: `_____________________`
- [ ] **Wedding DB User Password**: `_____________________`
- [ ] **NextAuth Secret**: `_____________________` (generate with: `openssl rand -base64 32`)

---

## ⚡ Quick Setup Commands

### 1. Server Preparation (5 mins)
```bash
# Connect to VPS
ssh root@YOUR_VPS_IP

# System update
apt update && apt upgrade -y

# Install Node.js 20, MySQL, Nginx, PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs mysql-server nginx
npm install -g pm2
```

### 2. Database Setup (3 mins)
```bash
# Secure MySQL and create database
mysql_secure_installation

mysql -u root -p
```
```sql
CREATE DATABASE wedding_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wedding_user'@'localhost' IDENTIFIED BY 'YOUR_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON wedding_db.* TO 'wedding_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Application Deployment (5 mins)
```bash
# Clone and setup application
mkdir -p /var/www/sharothee-wedding
cd /var/www/sharothee-wedding
git clone https://github.com/syed-reza98/Sharothee-Wedding.git .
cd client

# Install and build
npm install
npx prisma generate
```

### 4. Environment Configuration (2 mins)
```bash
# Create production environment file
nano .env.local
```
```bash
NODE_ENV=production
DATABASE_URL="mysql://wedding_user:YOUR_DB_PASSWORD@localhost:3306/wedding_db"
NEXTAUTH_SECRET="YOUR_GENERATED_SECRET"
NEXTAUTH_URL="https://YOUR_DOMAIN.com"
RESEND_API_KEY="YOUR_RESEND_KEY"
CLOUDINARY_CLOUD_NAME="YOUR_CLOUDINARY_NAME"
CLOUDINARY_API_KEY="YOUR_CLOUDINARY_KEY"
CLOUDINARY_API_SECRET="YOUR_CLOUDINARY_SECRET"
```

### 5. Database Migration & Build (3 mins)
```bash
npx prisma db push
npm run build
```

### 6. PM2 Process Management (2 mins)
```bash
# Create PM2 config
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
    env: { NODE_ENV: 'production', PORT: 3000 }
  }]
};
```
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 7. Nginx Configuration (5 mins)
```bash
# Create nginx site config
nano /etc/nginx/sites-available/sharothee-wedding
```
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com;
    
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
    }
}
```

### 8. SSL Certificate (3 mins)
```bash
# Enable site and get SSL
ln -s /etc/nginx/sites-available/sharothee-wedding /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t

# Install Certbot and get certificate
apt install -y certbot python3-certbot-nginx
certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com

systemctl restart nginx
```

---

## ✅ Validation Steps

### Test Application (2 mins)
- [ ] **Local test**: `curl -I http://localhost:3000`
- [ ] **Live test**: `curl -I https://YOUR_DOMAIN.com`
- [ ] **SSL test**: Check certificate in browser
- [ ] **Database test**: `cd /var/www/sharothee-wedding/client && npx prisma studio --port 5555`

### Functional Testing (5 mins)
- [ ] **Homepage loads**: Visit https://YOUR_DOMAIN.com
- [ ] **Navigation works**: Test all menu links
- [ ] **RSVP page**: Test RSVP functionality
- [ ] **Events page**: Verify event information displays
- [ ] **Contact form**: Test form submission
- [ ] **Admin access**: Verify admin dashboard works

---

## 🔒 Security Setup (Optional but Recommended)

### Firewall Configuration
```bash
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable
```

### Fail2Ban Protection
```bash
apt install -y fail2ban
systemctl start fail2ban
systemctl enable fail2ban
```

### Automated Backups
```bash
# Create backup script
nano /opt/scripts/backup.sh
chmod +x /opt/scripts/backup.sh

# Schedule daily backups at 2 AM
crontab -e
# Add: 0 2 * * * /opt/scripts/backup.sh
```

---

## 🆘 Quick Troubleshooting

### Application Issues
```bash
# Check PM2 status
pm2 status
pm2 logs sharothee-wedding

# Restart application
pm2 restart sharothee-wedding
```

### Database Issues
```bash
# Test database connection
mysql -u wedding_user -p wedding_db

# Check Prisma connection
cd /var/www/sharothee-wedding/client
npx prisma db push
```

### Nginx Issues
```bash
# Test nginx configuration
nginx -t

# Restart nginx
systemctl restart nginx

# Check nginx logs
tail -f /var/log/nginx/error.log
```

---

## 📞 Support Information

### Hostinger Support
- **Chat Support**: Available 24/7 in Hostinger panel
- **Knowledge Base**: https://support.hostinger.com
- **VPS Documentation**: Hostinger control panel → VPS section

### Application Support
- **Repository**: https://github.com/syed-reza98/Sharothee-Wedding
- **Issues**: GitHub Issues tab
- **Documentation**: Repository README.md

---

## 🚀 Deployment Timeline

**Total Estimated Time: 30-40 minutes**

1. **Server Setup** (5 mins): System updates, software installation
2. **Database Setup** (3 mins): MySQL configuration and user creation
3. **Application Clone** (5 mins): Repository download and dependency installation
4. **Environment Config** (2 mins): Environment variables setup
5. **Build & Migration** (3 mins): Database migration and application build
6. **Process Management** (2 mins): PM2 configuration and startup
7. **Web Server Config** (5 mins): Nginx configuration and testing
8. **SSL Setup** (3 mins): Let's Encrypt certificate installation
9. **Validation** (7 mins): Functional testing and verification
10. **Security** (5 mins): Basic security hardening

---

**Quick Reference Version**: 1.0  
**For detailed instructions**: See `HOSTINGER_VPS_DEPLOYMENT_PLAN.md`