#!/bin/bash

echo "🔍 Sharothee Wedding Website - Production Health Check"
echo "=================================================="

# Check VPS status
echo "✅ VPS Status Check:"
curl -s -X GET "https://developers.hostinger.com/api/vps/v1/virtual-machines/947344" \
  -H "Authorization: Bearer H1AetiOwg7YtsC8bpJL1hhS7QUmUQVWKP3OogPj0c1236787" \
  -H "Content-Type: application/json" | grep -o '"state":"[^"]*"'

echo ""

# Check services
echo "✅ Service Status:"
echo "Nginx: $(systemctl is-active nginx)"
echo "MySQL: $(systemctl is-active mysql)"
echo "PM2: $(pm2 list | grep -o 'online\|stopped' | head -1)"

echo ""

# Check application response
echo "✅ Application Health:"
echo "HTTP Status: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health)"
echo "HTTPS Status: $(curl -s -o /dev/null -w "%{http_code}" https://arvinwedsincia.com/api/health)"

echo ""

# Check SSL certificate
echo "✅ SSL Certificate:"
echo | openssl s_client -servername arvinwedsincia.com -connect arvinwedsincia.com:443 2>/dev/null | openssl x509 -noout -dates

echo ""

# Check database connection
echo "✅ Database Status:"
mysql -u wedding_user -p -e "SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = 'wedding_db';" 2>/dev/null || echo "Database connection test needed"

echo ""
echo "🎉 Health check completed!"
