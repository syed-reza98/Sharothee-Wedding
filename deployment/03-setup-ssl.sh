#!/bin/bash

# SSL Certificate Setup Script
# Run this script as root after domain is properly pointed to the server

set -e

DOMAIN="arvinwedsincia.com"

echo "🔒 Setting up SSL certificate for $DOMAIN..."

# Check if domain is provided
if [ "$1" != "" ]; then
    DOMAIN="$1"
fi

echo "Setting up SSL for domain: $DOMAIN"

# Update Nginx configuration with actual domain
echo "🌐 Updating Nginx configuration with domain: $DOMAIN"
sed -i "s/arvinwedsincia.com/$DOMAIN/g" /etc/nginx/sites-available/wedding

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx

# Obtain SSL certificate
echo "📜 Obtaining SSL certificate from Let's Encrypt..."
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email "admin@$DOMAIN"

# Verify SSL certificate
echo "✅ Verifying SSL certificate..."
certbot certificates

# Test SSL renewal
echo "🔄 Testing SSL renewal..."
certbot renew --dry-run

# Update Nginx configuration to use SSL
echo "🔧 Finalizing Nginx SSL configuration..."
systemctl reload nginx

# Test the website
echo "🧪 Testing website accessibility..."
curl -I "https://$DOMAIN" || echo "⚠️ Website test failed - check configuration"

echo "✅ SSL setup complete!"
echo "Your website should now be accessible at: https://$DOMAIN"

# Set up automatic renewal
echo "⏰ SSL certificates will auto-renew via cron job"
echo "Current cron jobs:"
crontab -l | grep certbot || echo "No certbot cron job found"