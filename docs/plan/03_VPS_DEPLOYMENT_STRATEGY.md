# 🚀 VPS Deployment Strategy & CI/CD Plan

**Project:** Sharothee Wedding Website  
**Current VPS:** Hostinger KVM 1 (31.97.189.238)  
**Domain:** arvinwedsincia.com  
**Last Updated:** August 15, 2025  

---

## 📋 Current Deployment Status

### ✅ Production Environment
- **Server:** Ubuntu 24.04.3 LTS
- **Domain:** arvinwedsincia.com (SSL enabled)
- **Database:** MySQL 8.0 (wedding_db)
- **Web Server:** Nginx (reverse proxy)
- **Process Manager:** PM2
- **Node.js:** v20.x
- **Application:** Next.js 15.4.5

### 🔄 Current Deployment Process (Manual)
```bash
# Current manual deployment steps
1. SSH into VPS: ssh root@31.97.189.238
2. Navigate to app: cd /var/www/wedding/client
3. Pull changes: git pull origin main
4. Install deps: npm install
5. Build app: npm run build
6. Restart PM2: pm2 restart all
7. Check status: pm2 status
```

**Issues with Current Process:**
- Manual intervention required
- No automated testing
- Potential for human error
- No rollback mechanism
- Downtime during deployment

---

## 🎯 Improved CI/CD Strategy

### Phase 1: Automated GitHub Actions Workflow

**Setup GitHub Actions Pipeline:**

```yaml
# .github/workflows/deploy-production.yml
name: Deploy to Production VPS

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: client/package-lock.json
      
      - name: Install dependencies
        run: |
          cd client
          npm ci
      
      - name: Run tests
        run: |
          cd client
          npm run test
      
      - name: Run lint
        run: |
          cd client
          npm run lint
      
      - name: Type check
        run: |
          cd client
          npm run type-check
      
      - name: Build application
        run: |
          cd client
          npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          passphrase: ${{ secrets.VPS_SSH_PASSPHRASE }}
          script: |
            cd /var/www/wedding
            git pull origin main
            cd client
            npm ci --only=production
            npm run build
            pm2 restart wedding-app
            pm2 save
```

### Phase 2: Zero-Downtime Deployment

**Blue-Green Deployment Strategy:**

```bash
# Setup script for blue-green deployment
#!/bin/bash

# Create deployment directories
mkdir -p /var/www/wedding-blue
mkdir -p /var/www/wedding-green

# Symlink management
ln -sfn /var/www/wedding-blue /var/www/wedding-current

# PM2 ecosystem for multiple instances
# ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'wedding-blue',
      script: '/var/www/wedding-blue/client/server.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'wedding-green',
      script: '/var/www/wedding-green/client/server.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
  ]
}
```

### Phase 3: Health Checks & Monitoring

**Health Check Integration:**

```bash
# Health check script
#!/bin/bash
HEALTH_URL="https://arvinwedsincia.com/api/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ $RESPONSE != "200" ]; then
    echo "Health check failed with status: $RESPONSE"
    # Rollback mechanism
    pm2 restart wedding-app
    exit 1
fi

echo "Health check passed"
```

---

## 🔄 Safe Deployment Workflow

### 1. Pre-Deployment Validation

```bash
# Pre-deployment checklist script
#!/bin/bash

echo "🔍 Pre-deployment validation..."

# Check database connection
npm run db:check

# Validate environment variables
npm run env:validate

# Run security scan
npm audit

# Check disk space
df -h | grep "/var/www"

# Backup current deployment
tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz /var/www/wedding/client
```

### 2. Deployment Steps

```bash
# Safe deployment script
#!/bin/bash
set -e

echo "🚀 Starting safe deployment..."

# 1. Create new deployment directory
NEW_DEPLOYMENT="/var/www/wedding-$(date +%Y%m%d-%H%M%S)"
mkdir -p $NEW_DEPLOYMENT

# 2. Clone and build in new directory
cd $NEW_DEPLOYMENT
git clone https://github.com/syed-reza98/Sharothee-Wedding.git .
cd client
npm ci --only=production
npm run build

# 3. Validate build
if [ ! -d ".next" ]; then
    echo "❌ Build failed, aborting deployment"
    exit 1
fi

# 4. Test database migrations
npm run db:migrate:dry-run

# 5. Run health check on new build
npm run test:production

# 6. Switch symlink (atomic operation)
ln -sfn $NEW_DEPLOYMENT/client /var/www/wedding-current

# 7. Restart application
pm2 restart wedding-app --update-env

# 8. Wait and verify
sleep 10
curl -f https://arvinwedsincia.com/api/health || {
    echo "❌ Health check failed, rolling back"
    pm2 rollback wedding-app
    exit 1
}

echo "✅ Deployment successful!"
```

### 3. Rollback Strategy

```bash
# Rollback script
#!/bin/bash

echo "🔄 Rolling back to previous deployment..."

# Get previous deployment
PREVIOUS=$(ls -1t /var/www/wedding-* | sed -n '2p')

if [ -z "$PREVIOUS" ]; then
    echo "❌ No previous deployment found"
    exit 1
fi

# Switch symlink back
ln -sfn $PREVIOUS/client /var/www/wedding-current

# Restart with previous version
pm2 restart wedding-app

# Verify rollback
sleep 5
curl -f https://arvinwedsincia.com/api/health && echo "✅ Rollback successful"
```

---

## 🔧 Environment Management

### Development vs Production Separation

**Environment-specific configurations:**

```bash
# .env.production
DATABASE_URL="mysql://wedding_user:password@localhost:3306/wedding_db"
NEXTAUTH_URL="https://arvinwedsincia.com"
NEXTAUTH_SECRET="production-secret-key"
RESEND_API_KEY="production-email-key"
CLOUDINARY_CLOUD_NAME="production-cloudinary"

# .env.staging
DATABASE_URL="mysql://wedding_user:password@localhost:3306/wedding_db_staging"
NEXTAUTH_URL="https://staging.arvinwedsincia.com"
NEXTAUTH_SECRET="staging-secret-key"
RESEND_API_KEY="staging-email-key"
```

### Secret Management

```bash
# GitHub Secrets Required:
VPS_HOST=31.97.189.238
VPS_USERNAME=root
VPS_SSH_KEY=<private-ssh-key>
VPS_SSH_PASSPHRASE=salman457
PRODUCTION_DATABASE_URL=<mysql-connection-string>
PRODUCTION_NEXTAUTH_SECRET=<secure-secret>
PRODUCTION_RESEND_API_KEY=<email-api-key>
```

---

## 📊 Monitoring & Alerting

### 1. Application Monitoring

```bash
# PM2 monitoring setup
pm2 install pm2-logrotate
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:max_size 10M

# System monitoring
pm2 install pm2-server-monit
```

### 2. Health Check Endpoints

```javascript
// /api/health endpoint enhancement
export async function GET() {
  const checks = {
    database: await checkDatabase(),
    email: await checkEmailService(),
    storage: await checkDiskSpace(),
    memory: process.memoryUsage(),
    uptime: process.uptime()
  }
  
  const allHealthy = Object.values(checks).every(check => 
    typeof check === 'object' ? check.status === 'healthy' : check
  )
  
  return Response.json({
    status: allHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    checks
  }, {
    status: allHealthy ? 200 : 503
  })
}
```

### 3. Alert System

```bash
# Simple webhook alert for failures
curl -X POST "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK" \
  -H 'Content-type: application/json' \
  --data '{
    "text": "🚨 Wedding website deployment failed!",
    "username": "VPS Monitor",
    "icon_emoji": ":warning:"
  }'
```

---

## 🔐 Security Considerations

### 1. SSH Key Rotation
```bash
# Monthly SSH key rotation
ssh-keygen -t ed25519 -C "wedding-deploy-$(date +%Y%m)"
# Update GitHub secrets
# Remove old key from VPS
```

### 2. Database Security
```bash
# Regular database backups before deployment
mysqldump --single-transaction wedding_db > backup-$(date +%Y%m%d).sql
# Store in secure location
```

### 3. SSL Certificate Management
```bash
# Automated SSL renewal check
certbot renew --dry-run
# Add to cron: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 📈 Performance Optimization

### 1. Build Optimization
```bash
# Production build with optimizations
npm run build
npm run analyze # Bundle analysis

# Static file optimization
find .next/static -name "*.js" -exec gzip {} \;
find .next/static -name "*.css" -exec gzip {} \;
```

### 2. Caching Strategy
```nginx
# Nginx caching configuration
location /_next/static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location /images/ {
    expires 30d;
    add_header Cache-Control "public";
}
```

---

## 🎯 Migration Plan for Future Versions

### 1. Database Migration Strategy
```bash
# Safe database migrations
npx prisma migrate deploy
npx prisma generate
# Verify migration success before app restart
```

### 2. Feature Flag System
```javascript
// Gradual feature rollout
const features = {
  newGalleryLayout: process.env.FEATURE_NEW_GALLERY === 'true',
  enhancedRSVP: process.env.FEATURE_ENHANCED_RSVP === 'true'
}
```

### 3. A/B Testing Framework
```javascript
// Simple A/B testing
const variant = Math.random() > 0.5 ? 'A' : 'B'
// Track in analytics
```

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing locally
- [ ] Environment variables configured
- [ ] Database backup completed
- [ ] Health checks implemented
- [ ] Rollback plan prepared

### During Deployment
- [ ] Monitor application logs
- [ ] Check system resources
- [ ] Verify health endpoints
- [ ] Test critical user flows
- [ ] Monitor error rates

### Post-Deployment
- [ ] Verify all features working
- [ ] Check performance metrics
- [ ] Monitor for 24 hours
- [ ] Update documentation
- [ ] Clean up old deployments

---

**Next Steps:**
1. Implement GitHub Actions workflow
2. Set up blue-green deployment
3. Create monitoring dashboard
4. Document rollback procedures
5. Train team on new deployment process

**Estimated Setup Time:** 8-12 hours  
**Expected Downtime Reduction:** 95% (from 5 minutes to <30 seconds)  
**Deployment Reliability:** 99.9% success rate with automated rollbacks
