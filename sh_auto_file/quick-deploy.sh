#!/bin/bash

echo "🎉 Sharothee Wedding Website - Quick Deployment Script"
echo "====================================================="

# Phase 1: Local build verification
echo "Phase 1: Verifying local build..."
cd "i:\CodeStorm\Hostinger\Sharothee-Wedding\client"
npm run build

# Phase 2-8: VPS deployment (run on VPS)
echo "Phase 2-8: Copy and run on VPS:"
echo "scp -r . root@31.97.189.238:/var/www/Sharothee-Wedding/"
echo "ssh root@31.97.189.238"
echo "cd /var/www/Sharothee-Wedding && chmod +x deploy-vps.sh && ./deploy-vps.sh"

echo ""
echo "✅ Deployment plan ready!"
echo "🌐 Target URL: https://arvinwedsincia.com"
echo "🔧 Admin Panel: https://arvinwedsincia.com/admin"
echo ""
echo "Next steps:"
echo "1. Update .env.production with actual API keys"
echo "2. Run deployment script on VPS"
echo "3. Test all functionality"
echo "4. Go live! 🎊"
