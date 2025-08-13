#!/bin/bash

echo "🔍 Sharothee Wedding Website - Deployment Health Check"
echo "====================================================="

VPS_IP="31.97.189.238"
DOMAIN="arvinwedsincia.com"

echo "📡 Checking VPS connectivity..."
ping -c 3 $VPS_IP

echo "🌐 Checking domain resolution..."
nslookup $DOMAIN

echo "🔗 Checking HTTP response..."
curl -I http://$DOMAIN || echo "HTTP not responding"

echo "🔒 Checking HTTPS response..."
curl -I https://$DOMAIN || echo "HTTPS not responding"

echo "🔍 Checking specific endpoints..."
echo "Health check:"
curl -s https://$DOMAIN/api/health || echo "Health endpoint not responding"

echo ""
echo "Homepage:"
curl -s -I https://$DOMAIN || echo "Homepage not responding"

echo ""
echo "Admin panel:"
curl -s -I https://$DOMAIN/admin || echo "Admin panel not responding"

echo ""
echo "📊 DNS Records Check:"
dig $DOMAIN A
dig $DOMAIN AAAA

echo "✅ Health check completed!"
