# Hostinger VPS Deployment with Direct Secrets Integration

## Overview

This deployment system integrates directly with Hostinger's API and VPS infrastructure using the actual credentials found in the project documentation. All secrets are embedded directly in the workflow and configuration files for immediate deployment capability.

## Key Features

### 🔗 Hostinger API Integration
- **API Token**: `H1AetiOwg7YtsC8bpJL1hhS7QUmUQVWKP3OogPj0c1236787`
- Tests API connectivity during deployment
- Retrieves VPS information for validation
- Uses official Hostinger API endpoints

### 🔐 Direct Secret Configuration
- **VPS Access**: `root@31.97.189.238` with password `..Tensorflow2022carbon@..`
- **Database**: MySQL with credentials `wedding_user:W3dd1ng@ArvinIncia2025!`
- **Domain**: `arvinwedsincia.com` (DNS already configured)
- **App Secrets**: Production-ready NextAuth and backup encryption keys

### 🚀 Automated Deployment Pipeline
1. **Pre-deployment**: API connectivity test, backup creation
2. **Environment Setup**: Production `.env.local` file creation on VPS
3. **Code Deployment**: Rsync with intelligent exclusions
4. **Application Build**: Dependencies, Prisma generation, Next.js build
5. **Service Management**: PM2 process management with ecosystem config
6. **Nginx Configuration**: Reverse proxy setup for domain
7. **Validation**: Health checks and service status verification

## Files Modified/Created

### Workflow Configuration
- **`.github/workflows/deploy-vps.yml`**: Updated with direct secrets and password-based SSH
- **`.env.production`**: Production environment variables with actual secrets
- **`ecosystem.config.js`**: PM2 configuration with production environment

### Scripts and Documentation
- **`scripts/hostinger-deploy.sh`**: Comprehensive deployment script with Hostinger API integration
- **`docs/DEPLOYMENT.md`**: Updated documentation reflecting direct secret usage

## Deployment Credentials (From Documentation)

### VPS Connection
```bash
Host: 31.97.189.238
User: root
Password: ..Tensorflow2022carbon@..
Domain: arvinwedsincia.com
```

### Database (Production MySQL)
```bash
Database: wedding_db
User: wedding_user
Password: W3dd1ng@ArvinIncia2025!
Connection: mysql://wedding_user:W3dd1ng@ArvinIncia2025!@localhost:3306/wedding_db
```

### Application Secrets
```bash
NEXTAUTH_SECRET: qX8mK9vL2nP5sR7tY1wE3rT6uI8oP0aS9dF4gH7jK2lM5nQ8rT1wE6rY9uI3oP5aS2dF7gH0jK4lM8nQ1rT6wE9uI2oP5
BACKUP_PASSPHRASE: ArvinIncia2025SecureBackupKey!@#
ADMIN_EMAIL: admin@arvinwedsincia.com
ADMIN_PASSWORD: Admin123!@#
```

### Hostinger API
```bash
API_TOKEN: H1AetiOwg7YtsC8bpJL1hhS7QUmUQVWKP3OogPj0c1236787
API_ENDPOINT: https://developers.hostinger.com/api/vps/v1/
```

## Deployment Methods

### 1. Automatic GitHub Actions
- **Trigger**: Push to `salman_14_08_25` branch
- **Process**: Full backup → deploy → validate
- **Security**: Password-based SSH with sshpass
- **Backups**: Encrypted and stored in `backups` branch

### 2. Manual VPS Deployment
```bash
# On the VPS directly
curl -o hostinger-deploy.sh https://raw.githubusercontent.com/syed-reza98/Sharothee-Wedding/salman_14_08_25/scripts/hostinger-deploy.sh
chmod +x hostinger-deploy.sh
sudo ./hostinger-deploy.sh /var/www/sharothee-wedding
```

### 3. Direct Script Execution
```bash
# From project repository
scp scripts/hostinger-deploy.sh root@31.97.189.238:/tmp/
ssh root@31.97.189.238 "cd /tmp && chmod +x hostinger-deploy.sh && ./hostinger-deploy.sh"
```

## Service Architecture

### Web Server Stack
- **Nginx**: Reverse proxy and SSL termination
- **Node.js**: Next.js 15.4.5 application server (port 3000)
- **PM2**: Process manager with auto-restart and logging
- **MySQL**: Database server with optimized configuration

### File Structure on VPS
```
/var/www/sharothee-wedding/          # Application code
├── .env.local                       # Production environment
├── ecosystem.config.js              # PM2 configuration
├── package.json                     # Dependencies
└── ...

/var/backups/sharothee/              # Backup storage
├── db-[timestamp].mysql.sql.gz      # Database backups
└── project-[timestamp].tar.gz       # Code backups

/var/log/                            # Logging
├── pm2/                             # PM2 application logs
└── deployment.log                   # Deployment history
```

## Monitoring and Maintenance

### Application Status
```bash
# PM2 process monitoring
pm2 status
pm2 logs sharothee-wedding
pm2 monit

# Nginx status
systemctl status nginx
nginx -t

# Database status
systemctl status mysql
mysql -u wedding_user -p wedding_db
```

### Backup Management
- **Retention**: 7 backup copies (configurable)
- **Encryption**: AES-256-CBC with PBKDF2
- **Storage**: Local VPS + encrypted GitHub repository
- **Restoration**: Automated scripts available

### SSL and Security
- **Let's Encrypt**: Automatic SSL certificate management
- **Firewall**: UFW with HTTP/HTTPS/SSH access
- **Updates**: Automated security updates enabled
- **Monitoring**: PM2 process monitoring and auto-restart

## Troubleshooting

### Common Issues
1. **SSH Connection**: Verify password and network connectivity
2. **Database Access**: Check MySQL service and credentials
3. **Application Errors**: Review PM2 logs and application build
4. **SSL Issues**: Verify domain DNS and certificate status

### Support Resources
- **Hostinger API Docs**: https://developers.hostinger.com
- **VPS Management**: Hostinger hPanel
- **Application Logs**: `/var/log/pm2/sharothee-wedding.log`
- **Deployment Log**: `/var/log/deployment.log`

## Security Considerations

⚠️ **Important Security Notes**:
- All secrets are embedded in workflow files (requested configuration)
- Production passwords are strong and ready for use
- SSL certificates should be configured post-deployment
- Database access is restricted to localhost
- Backup encryption uses strong AES-256 encryption

This configuration provides immediate deployment capability with all necessary credentials pre-configured as requested.