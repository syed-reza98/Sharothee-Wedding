# Hostinger VPS Deployment - Step-by-Step Guide

## Prerequisites Checklist

### ✅ From Hostinger
- [ ] VPS access credentials (IP, username, password/SSH key)
- [ ] Domain already pointed to VPS (DNS configured)
- [ ] MySQL database service (if using Hostinger's managed MySQL)

### ✅ External Services Setup Required
- [ ] **Cloudinary Account**: Sign up at https://cloudinary.com
  - Get Cloud Name, API Key, API Secret
- [ ] **Resend Account**: Sign up at https://resend.com  
  - Get API Key
- [ ] **NextAuth Secret**: Generate secure random string

### ✅ GitHub Repository Secrets
Configure these in your GitHub repository settings > Secrets and variables > Actions:

```
VPS_HOST=your-vps-ip-address
VPS_USERNAME=deploy
VPS_SSH_KEY=your-private-ssh-key
VPS_PORT=22
DATABASE_URL=mysql://wedding_user:password@localhost:3306/wedding_db
NEXTAUTH_SECRET=your-secure-random-string
NEXTAUTH_URL=https://arvinwedsincia.com
RESEND_API_KEY=re_your_resend_api_key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Step 1: Initial Server Setup

1. **Connect to your VPS**:
   ```bash
   ssh root@your-vps-ip
   ```

2. **Run server setup script**:
   ```bash
   curl -sSL https://raw.githubusercontent.com/syed-reza98/Sharothee-Wedding/main/deployment/01-server-setup.sh | bash
   ```

3. **Update domain name in Nginx config**:
   ```bash
   nano /etc/nginx/sites-available/wedding
   # Replace 'arvinwedsincia.com' with your actual domain
   ```

4. **Create MySQL database user password**:
   ```bash
   mysql -u root -p
   ALTER USER 'wedding_user'@'localhost' IDENTIFIED BY 'your-secure-password';
   EXIT;
   ```

## Step 2: SSL Certificate Setup

1. **Run SSL setup script**:
   ```bash
   ./deployment/03-setup-ssl.sh arvinwedsincia.com
   ```

2. **Verify SSL certificate**:
   ```bash
   curl -I https://arvinwedsincia.com
   ```

## Step 3: Application Deployment

### Option A: Manual Deployment

1. **Switch to deploy user**:
   ```bash
   su - deploy
   ```

2. **Run deployment script**:
   ```bash
   cd /var/www/wedding
   curl -sSL https://raw.githubusercontent.com/syed-reza98/Sharothee-Wedding/main/deployment/02-deploy-app.sh | bash
   ```

3. **Update environment variables**:
   ```bash
   nano /var/www/wedding/current/client/.env.local
   ```

### Option B: Automated CI/CD

1. **Configure GitHub Secrets** (see prerequisites above)

2. **Push to main branch** to trigger automated deployment:
   ```bash
   git push origin main
   ```

## Step 4: Verification

1. **Check application status**:
   ```bash
   pm2 status
   pm2 logs wedding-website
   ```

2. **Test website**:
   ```bash
   curl -I https://arvinwedsincia.com
   curl https://arvinwedsincia.com/api/health
   ```

3. **Verify all features**:
   - [ ] Homepage loads correctly
   - [ ] Events page displays wedding events
   - [ ] RSVP functionality works
   - [ ] Contact form works
   - [ ] Admin login functions

## Step 5: Monitoring Setup

1. **Setup health monitoring**:
   ```bash
   # Add to crontab for deploy user
   crontab -e
   # Add: */15 * * * * /var/www/wedding/deployment/health-check.sh
   ```

2. **Setup daily backups**:
   ```bash
   # Add to crontab for deploy user  
   crontab -e
   # Add: 0 2 * * * /var/www/wedding/deployment/backup.sh
   ```

## Maintenance Commands

### Update Application
```bash
# Manual update
cd /var/www/wedding
git pull origin main
cd client && npm run build
pm2 restart wedding-website

# Or push to GitHub for automated deployment
```

### View Logs
```bash
pm2 logs wedding-website
tail -f /var/www/wedding/logs/combined.log
```

### Backup Database
```bash
./deployment/backup.sh
```

### Health Check
```bash
./deployment/health-check.sh
```

## Troubleshooting

### Application Won't Start
1. Check environment variables: `cat /var/www/wedding/current/client/.env.local`
2. Check build errors: `cd /var/www/wedding/current/client && npm run build`
3. Check PM2 logs: `pm2 logs wedding-website --lines 50`

### Database Connection Issues
1. Test MySQL connection: `mysql -u wedding_user -p wedding_db`
2. Check DATABASE_URL format in .env.local
3. Verify MySQL service: `systemctl status mysql`

### SSL Certificate Issues
1. Renew certificate: `certbot renew`
2. Check certificate status: `certbot certificates`
3. Test renewal: `certbot renew --dry-run`

### Website Not Accessible
1. Check Nginx status: `systemctl status nginx`
2. Test Nginx config: `nginx -t`
3. Check firewall: `ufw status`
4. Verify domain DNS: `nslookup arvinwedsincia.com`

## Support

For issues with this deployment, check:
1. Application logs: `/var/www/wedding/logs/`
2. Nginx logs: `/var/log/nginx/`
3. System logs: `journalctl -u nginx`, `journalctl -u mysql`

---

**🎉 Congratulations! Your Sharothee Wedding Website is now live!**