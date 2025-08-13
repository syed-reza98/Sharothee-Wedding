#!/bin/bash

echo "🎉 Sharothee Wedding Website - VPS Complete Setup"
echo "================================================="

# Configuration
DOMAIN="arvinwedsincia.com"
DB_NAME="wedding_db"
DB_USER="wedding_user"
DB_PASSWORD="W3dd1ng@ArvinIncia2025!"
PROJECT_PATH="/var/www/Sharothee-Wedding/client"

echo "📋 Phase 1: System Configuration"
echo "================================="

# Update system
echo "Updating system packages..."
apt update && apt upgrade -y

# Install required packages
echo "Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs mysql-server nginx certbot python3-certbot-nginx

# Install PM2
echo "Installing PM2..."
npm install -g pm2

echo "✅ System packages installed!"

echo ""
echo "📋 Phase 2: MySQL Database Setup"
echo "================================="

# Start MySQL
systemctl start mysql
systemctl enable mysql

# Create database and user
echo "Setting up MySQL database..."
mysql -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"
mysql -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

echo "✅ Database setup completed!"

echo ""
echo "📋 Phase 3: Application Setup"
echo "============================="

# Navigate to project directory
cd $PROJECT_PATH

# Create production environment file
echo "Creating production environment file..."
cat > .env.local << EOF
# Production Environment
NODE_ENV=production

# Database
DATABASE_URL="mysql://$DB_USER:$DB_PASSWORD@localhost:3306/$DB_NAME"

# NextAuth
NEXTAUTH_SECRET="qX8mK9vL2nP5sR7tY1wE3rT6uI8oP0aS9dF4gH7jK2lM5nQ8rT1wE6rY9uI3oP5aS2dF7gH0jK4lM8nQ1rT6wE9uI2oP5"
NEXTAUTH_URL="https://$DOMAIN"

# Admin
ADMIN_EMAIL="admin@arvinwedsincia.com"
ADMIN_PASSWORD="Adm1n@ArvinIncia2025!Secure"

# Application
NEXT_PUBLIC_APP_URL="https://$DOMAIN"

# API Keys (to be configured)
RESEND_API_KEY=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=""
EOF

# Update Prisma schema for MySQL
echo "Updating Prisma schema for MySQL..."
sed -i 's/provider = "sqlite"/provider = "mysql"/' prisma/schema.prisma
sed -i 's/String?$/String? @db.Text/' prisma/schema.prisma

# Install dependencies
echo "Installing production dependencies..."
npm ci

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "Running database migrations..."
npx prisma db push

# Seed database
echo "Seeding database..."
npm run db:seed || echo "Seeding skipped (may not be available)"

# Build application
echo "Building application..."
npm run build

echo "✅ Application setup completed!"

echo ""
echo "📋 Phase 4: PM2 Process Manager"
echo "=============================="

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'sharothee-wedding',
      script: 'npm',
      args: 'start',
      cwd: '$PROJECT_PATH',
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
echo "Starting application with PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ PM2 process manager configured!"

echo ""
echo "📋 Phase 5: Nginx Configuration"
echo "==============================="

# Create Nginx configuration
cat > /etc/nginx/sites-available/$DOMAIN << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;

    # SSL Configuration (will be updated by Certbot)
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
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
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    # Client upload size
    client_max_body_size 50M;

    # Reverse proxy to Next.js application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_redirect off;
    }

    # Static files optimization
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API routes
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid!"
    systemctl reload nginx
else
    echo "❌ Nginx configuration has errors!"
    exit 1
fi

echo ""
echo "📋 Phase 6: SSL Certificate"
echo "=========================="

# Install SSL certificate
echo "Installing SSL certificate..."
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

if [ $? -eq 0 ]; then
    echo "✅ SSL certificate installed successfully!"
else
    echo "⚠️ SSL certificate installation failed. Please run manually later."
fi

echo ""
echo "📋 Phase 7: Final Configuration"
echo "==============================="

# Set up log directories
mkdir -p /var/log/pm2
chmod 755 /var/log/pm2

# Set up cron job for SSL renewal
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

echo ""
echo "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!"
echo "====================================="
echo ""
echo "🌐 Website URL: https://$DOMAIN"
echo "🔧 Admin Panel: https://$DOMAIN/admin"
echo ""
echo "📊 Useful Commands:"
echo "• Check application status: pm2 status"
echo "• View application logs: pm2 logs sharothee-wedding"
echo "• Restart application: pm2 restart sharothee-wedding"
echo "• Check Nginx status: systemctl status nginx"
echo "• Check SSL certificate: certbot certificates"
echo ""
echo "🔑 Admin Login Credentials:"
echo "• Email: admin@arvinwedsincia.com"
echo "• Password: Adm1n@ArvinIncia2025!Secure"
echo ""
echo "⚠️ IMPORTANT: Configure the following API keys in .env.local:"
echo "• RESEND_API_KEY for email functionality"
echo "• CLOUDINARY_* for media uploads"
echo "• NEXT_PUBLIC_GOOGLE_MAPS_API_KEY for maps"
echo ""
echo "🔍 Test your deployment at: https://$DOMAIN/api/health"
