#!/bin/bash

echo "🚀 Sharothee Wedding Website - Complete VPS Deployment"
echo "======================================================"

# VPS Connection Details
VPS_IP="31.97.189.238"
VPS_USER="root"
VPS_PASS="..Tensorflow2022carbon@.."
DOMAIN="arvinwedsincia.com"

echo "📡 Connecting to VPS at $VPS_IP..."

# Use sshpass to automate password entry
# First install sshpass if not available

# Test connection
echo "🔍 Testing VPS connection..."
sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP "echo 'Connection successful!'"

if [ $? -eq 0 ]; then
    echo "✅ VPS connection established"
else
    echo "❌ Failed to connect to VPS"
    exit 1
fi

# Execute deployment commands on VPS
echo "🚀 Starting deployment on VPS..."

sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP << 'ENDSSH'

echo "📦 System Update..."
apt update && apt upgrade -y

echo "📦 Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs mysql-server nginx git

echo "📦 Installing PM2..."
npm install -g pm2

echo "🔒 Setting up MySQL..."
# Set root password and secure installation
mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'W3dd1ng@ArvinIncia2025!Secure';"

# Create database and user
mysql -u root -pW3dd1ng@ArvinIncia2025!Secure << EOF
CREATE DATABASE wedding_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wedding_user'@'localhost' IDENTIFIED BY 'W3dd1ng@ArvinIncia2025!';
GRANT ALL PRIVILEGES ON wedding_db.* TO 'wedding_user'@'localhost';
FLUSH PRIVILEGES;
EOF

echo "📂 Setting up project directory..."
mkdir -p /var/www/
cd /var/www/

# Clone or copy project files
echo "📥 Getting project files..."
if [ -d "Sharothee-Wedding" ]; then
    echo "Project directory exists, pulling latest changes..."
    cd Sharothee-Wedding
    git pull origin salman_v1
else
    echo "Cloning project..."
    git clone https://github.com/syed-reza98/Sharothee-Wedding.git
    cd Sharothee-Wedding
    git checkout salman_v1
fi

cd client

echo "📦 Installing dependencies..."
npm install

echo "🔧 Setting up environment..."
cat > .env.production << EOF
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

echo "🗄️ Setting up database..."
npx prisma generate
npx prisma db push
npm run db:seed

echo "🏗️ Building application..."
npm run build

echo "🚀 Setting up PM2..."
cat > ecosystem.config.js << EOF
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

pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "🌐 Setting up Nginx..."
cat > /etc/nginx/sites-available/arvinwedsincia.com << EOF
server {
    listen 80;
    server_name arvinwedsincia.com www.arvinwedsincia.com;
    return 301 https://\$server_name\$request_uri;
}

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

    # Main application
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
    }

    # Handle static files
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
EOF

ln -s /etc/nginx/sites-available/arvinwedsincia.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t

if [ $? -eq 0 ]; then
    systemctl reload nginx
    echo "✅ Nginx configured successfully"
else
    echo "❌ Nginx configuration error"
    exit 1
fi

echo "🔒 Installing SSL certificate..."
apt install -y certbot python3-certbot-nginx
certbot --nginx -d arvinwedsincia.com -d www.arvinwedsincia.com --non-interactive --agree-tos --email admin@arvinwedsincia.com

echo "🔥 Setting up firewall..."
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable

echo "✅ Deployment completed!"
echo "🌐 Website: https://arvinwedsincia.com"
echo "🔧 Admin: https://arvinwedsincia.com/admin"

# Display service status
echo "📊 Service Status:"
echo "Nginx: $(systemctl is-active nginx)"
echo "MySQL: $(systemctl is-active mysql)"
echo "PM2: $(pm2 list | grep -o 'online\|stopped' | head -1)"

ENDSSH

echo "🎉 VPS Deployment completed!"
echo "🌐 Your website should now be available at: https://arvinwedsincia.com"
