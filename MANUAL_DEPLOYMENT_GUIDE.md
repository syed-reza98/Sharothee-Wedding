# Manual VPS Deployment Guide for Sharothee Wedding Website

## Prerequisites 
- **VPS IP**: 31.97.189.238
- **SSH User**: root  
- **SSH Password**: ..Tensorflow2022carbon@..
- **Domain**: arvinwedsincia.com

## Step 1: Connect to VPS
```bash
ssh root@31.97.189.238
# Enter password: ..Tensorflow2022carbon@..
```

## Step 2: System Setup
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs mysql-server nginx git

# Install PM2
npm install -g pm2
```

## Step 3: MySQL Setup
```bash
# Secure MySQL installation
mysql_secure_installation

# Create database and user
mysql -u root -p
```

```sql
CREATE DATABASE wedding_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wedding_user'@'localhost' IDENTIFIED BY 'W3dd1ng@ArvinIncia2025!';
GRANT ALL PRIVILEGES ON wedding_db.* TO 'wedding_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## Step 4: Project Setup
```bash
# Create project directory
mkdir -p /var/www/
cd /var/www/

# Clone project
git clone https://github.com/syed-reza98/Sharothee-Wedding.git
cd Sharothee-Wedding
git checkout salman_v1
cd client

# Install dependencies
npm install
```

## Step 5: Environment Configuration
```bash
# Create production environment file
cat > .env.production << 'EOF'
NODE_ENV=production
DATABASE_URL="mysql://wedding_user:W3dd1ng@ArvinIncia2025!@localhost:3306/wedding_db"
NEXTAUTH_URL="https://arvinwedsincia.com"
NEXTAUTH_SECRET="qX8mK9vL2nP5sR7tY1wE3rT6uI8oP0aS9dF4gH7jK2lM5nQ8rT1wE6rY9uI3oP5aS2dF7gH0jK4lM8nQ1rT6wE9uI2oP5"
RESEND_API_KEY="re_placeholder_update_with_real_resend_api_key"
CLOUDINARY_CLOUD_NAME="placeholder_cloudinary_name"
CLOUDINARY_API_KEY="placeholder_cloudinary_api_key"
CLOUDINARY_API_SECRET="placeholder_cloudinary_api_secret"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIza_placeholder_update_with_real_google_maps_api_key"
NEXT_PUBLIC_APP_URL="https://arvinwedsincia.com"
ADMIN_EMAIL="admin@arvinwedsincia.com"
ADMIN_PASSWORD="Adm1n@ArvinIncia2025!Secure"
EOF
```

## Step 6: Database Setup
```bash
# Generate Prisma client and setup database
npx prisma generate
npx prisma db push
npm run db:seed
```

## Step 7: Build Application
```bash
# Build for production
npm run build
```

## Step 8: PM2 Configuration
```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
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
    }
  ]
};
EOF

# Start application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Step 9: Nginx Configuration
```bash
# Create Nginx site configuration
cat > /etc/nginx/sites-available/arvinwedsincia.com << 'EOF'
server {
    listen 80;
    server_name arvinwedsincia.com www.arvinwedsincia.com;

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
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/arvinwedsincia.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t
systemctl reload nginx
```

## Step 10: SSL Certificate
```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d arvinwedsincia.com -d www.arvinwedsincia.com --email admin@arvinwedsincia.com --agree-tos --non-interactive
```

## Step 11: Firewall Setup
```bash
# Configure UFW firewall
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable
```

## Step 12: Verification
```bash
# Check service status
systemctl status nginx
systemctl status mysql
pm2 status

# Test website
curl -I https://arvinwedsincia.com
```

## Health Check Commands
```bash
# Check application logs
pm2 logs sharothee-wedding

# Check Nginx logs
tail -f /var/log/nginx/error.log

# Check MySQL
mysql -u wedding_user -p wedding_db
```

## Final URLs
- **Website**: https://arvinwedsincia.com
- **Admin Panel**: https://arvinwedsincia.com/admin
- **Health Check**: https://arvinwedsincia.com/api/health

---

**Note**: Replace placeholder API keys with real ones from:
- Resend (for email)
- Cloudinary (for media uploads)
- Google Maps (for location features)
