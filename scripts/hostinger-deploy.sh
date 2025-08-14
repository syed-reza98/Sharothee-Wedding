#!/bin/bash

# Comprehensive Hostinger VPS Deployment Script
# This script integrates with Hostinger API and handles complete deployment

set -e  # Exit on any error

# =============================================================================
# CONFIGURATION (Loaded from environment or defaults)
# =============================================================================

PROJECT_DIR="${1:-/var/www/sharothee-wedding}"
HOSTINGER_API_TOKEN="${HOSTINGER_API_TOKEN:-H1AetiOwg7YtsC8bpJL1hhS7QUmUQVWKP3OogPj0c1236787}"
DOMAIN="${DOMAIN:-arvinwedsincia.com}"
DB_NAME="${DB_NAME:-wedding_db}"
DB_USER="${DB_USER:-wedding_user}"
DB_PASSWORD="${DB_PASSWORD:-W3dd1ng@ArvinIncia2025!}"

LOG_FILE="/var/log/deployment.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# =============================================================================
# LOGGING FUNCTIONS
# =============================================================================

log() {
    echo "[$DATE] $1" | tee -a "$LOG_FILE"
}

error() {
    echo "[$DATE] ERROR: $1" | tee -a "$LOG_FILE" >&2
    exit 1
}

# =============================================================================
# HOSTINGER API FUNCTIONS
# =============================================================================

check_hostinger_api() {
    log "Testing Hostinger API connectivity..."
    
    local response=$(curl -s -w "%{http_code}" \
        -X GET "https://developers.hostinger.com/api/vps/v1/virtual-machines" \
        -H "Authorization: Bearer ${HOSTINGER_API_TOKEN}" \
        -H "Content-Type: application/json" \
        --max-time 30 || echo "000")
    
    local http_code=${response: -3}
    
    if [[ "$http_code" == "200" ]]; then
        log "✅ Hostinger API connection successful"
        return 0
    else
        log "⚠️  Hostinger API test returned code: $http_code (continuing anyway)"
        return 1
    fi
}

get_vps_info() {
    log "Retrieving VPS information via Hostinger API..."
    
    local vps_info=$(curl -s \
        -X GET "https://developers.hostinger.com/api/vps/v1/virtual-machines" \
        -H "Authorization: Bearer ${HOSTINGER_API_TOKEN}" \
        -H "Content-Type: application/json" \
        --max-time 30 2>/dev/null || echo "{}")
    
    if [[ "$vps_info" != "{}" ]]; then
        log "VPS Information retrieved successfully"
        echo "$vps_info" | head -c 200 >> "$LOG_FILE"  # Log first 200 chars
    else
        log "Could not retrieve VPS information (continuing anyway)"
    fi
}

# =============================================================================
# SYSTEM PREPARATION
# =============================================================================

prepare_system() {
    log "Preparing system for deployment..."
    
    # Update package lists
    apt-get update -qq || error "Failed to update package lists"
    
    # Install required packages if not present
    local packages=("nodejs" "npm" "mysql-client" "nginx")
    for package in "${packages[@]}"; do
        if ! dpkg -l | grep -q "^ii  $package "; then
            log "Installing $package..."
            apt-get install -y "$package" || error "Failed to install $package"
        fi
    done
    
    # Install PM2 globally if not present
    if ! command -v pm2 &> /dev/null; then
        log "Installing PM2..."
        npm install -g pm2 || error "Failed to install PM2"
    fi
    
    # Create log directories
    mkdir -p /var/log/pm2
    mkdir -p "$(dirname "$LOG_FILE")"
    
    log "✅ System preparation completed"
}

# =============================================================================
# DATABASE SETUP
# =============================================================================

setup_database() {
    log "Setting up MySQL database..."
    
    # Check if MySQL is running
    if ! systemctl is-active --quiet mysql; then
        log "Starting MySQL service..."
        systemctl start mysql || error "Failed to start MySQL"
    fi
    
    # Create database and user if they don't exist
    mysql -u root -p"${MYSQL_ROOT_PASSWORD:-}" <<EOF || error "Failed to setup database"
CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';
FLUSH PRIVILEGES;
EOF
    
    log "✅ Database setup completed"
}

# =============================================================================
# APPLICATION DEPLOYMENT
# =============================================================================

deploy_application() {
    log "Deploying application to $PROJECT_DIR..."
    
    cd "$PROJECT_DIR" || error "Failed to access project directory"
    
    # Install dependencies
    log "Installing Node.js dependencies..."
    npm ci --production=false || error "Failed to install dependencies"
    
    # Generate Prisma client
    log "Generating Prisma client..."
    npx prisma generate || error "Failed to generate Prisma client"
    
    # Run database migrations
    log "Running database migrations..."
    npx prisma db push || error "Failed to run database migrations"
    
    # Build the application
    log "Building Next.js application..."
    npm run build || error "Failed to build application"
    
    log "✅ Application deployment completed"
}

# =============================================================================
# NGINX CONFIGURATION
# =============================================================================

configure_nginx() {
    log "Configuring Nginx..."
    
    # Create Nginx configuration
    cat > "/etc/nginx/sites-available/$DOMAIN" <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:3000;
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

    # Handle static files
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # File upload size limit
    client_max_body_size 50M;
}
EOF

    # Enable the site
    ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/"
    
    # Remove default site if it exists
    rm -f /etc/nginx/sites-enabled/default
    
    # Test Nginx configuration
    nginx -t || error "Nginx configuration test failed"
    
    # Restart Nginx
    systemctl restart nginx || error "Failed to restart Nginx"
    
    log "✅ Nginx configuration completed"
}

# =============================================================================
# PM2 SERVICE MANAGEMENT
# =============================================================================

manage_pm2_service() {
    log "Managing PM2 service..."
    
    cd "$PROJECT_DIR" || error "Failed to access project directory"
    
    # Stop existing PM2 processes
    pm2 stop sharothee-wedding 2>/dev/null || log "No existing PM2 process to stop"
    pm2 delete sharothee-wedding 2>/dev/null || log "No existing PM2 process to delete"
    
    # Start application with PM2
    if [[ -f "ecosystem.config.js" ]]; then
        pm2 start ecosystem.config.js --env production || error "Failed to start PM2 with ecosystem config"
    else
        pm2 start npm --name "sharothee-wedding" -- start || error "Failed to start PM2"
    fi
    
    # Save PM2 configuration
    pm2 save || error "Failed to save PM2 configuration"
    
    # Setup PM2 startup script
    pm2 startup systemd -u root --hp /root || log "PM2 startup script already configured"
    
    log "✅ PM2 service management completed"
}

# =============================================================================
# SSL SETUP (OPTIONAL)
# =============================================================================

setup_ssl() {
    log "Setting up SSL with Let's Encrypt (optional)..."
    
    # Install Certbot if not present
    if ! command -v certbot &> /dev/null; then
        apt-get install -y certbot python3-certbot-nginx || error "Failed to install Certbot"
    fi
    
    # Obtain SSL certificate (non-interactive)
    certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email "admin@$DOMAIN" || log "SSL certificate setup failed (manual setup may be required)"
    
    log "✅ SSL setup completed"
}

# =============================================================================
# DEPLOYMENT VALIDATION
# =============================================================================

validate_deployment() {
    log "Validating deployment..."
    
    # Check if application is running
    sleep 5  # Wait for application to start
    
    local health_check=$(curl -s -w "%{http_code}" "http://localhost:3000" --max-time 10 || echo "000")
    local http_code=${health_check: -3}
    
    if [[ "$http_code" == "200" ]]; then
        log "✅ Application health check passed"
    else
        error "Application health check failed (HTTP code: $http_code)"
    fi
    
    # Check PM2 status
    local pm2_status=$(pm2 jlist | jq -r '.[0].pm2_env.status' 2>/dev/null || echo "unknown")
    if [[ "$pm2_status" == "online" ]]; then
        log "✅ PM2 process is online"
    else
        error "PM2 process status: $pm2_status"
    fi
    
    log "✅ Deployment validation completed"
}

# =============================================================================
# MAIN DEPLOYMENT FLOW
# =============================================================================

main() {
    log "========================================="
    log "Starting Hostinger VPS Deployment"
    log "========================================="
    log "Project Directory: $PROJECT_DIR"
    log "Domain: $DOMAIN"
    log "Database: $DB_NAME"
    log "========================================="
    
    # Execute deployment steps
    check_hostinger_api
    get_vps_info
    prepare_system
    setup_database
    deploy_application
    configure_nginx
    manage_pm2_service
    
    # Optional SSL setup (comment out if not needed immediately)
    # setup_ssl
    
    validate_deployment
    
    log "========================================="
    log "🎉 Deployment completed successfully!"
    log "========================================="
    log "Website: http://$DOMAIN"
    log "Application logs: pm2 logs sharothee-wedding"
    log "Deployment log: $LOG_FILE"
    log "========================================="
}

# =============================================================================
# SCRIPT EXECUTION
# =============================================================================

# Ensure script is run as root
if [[ $EUID -ne 0 ]]; then
    error "This script must be run as root"
fi

# Execute main function
main "$@"