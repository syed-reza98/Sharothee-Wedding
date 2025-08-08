# Required Credentials and Setup Information

## 🔑 Hostinger VPS Credentials Needed

### VPS Server Access
```
VPS IP Address: ________________
SSH Username: root (or custom)
SSH Password: ________________
OR SSH Private Key: [paste key content]
SSH Port: 22 (or custom)
```

### Domain Information
```
Domain Name: ________________
DNS Status: ✅ Already configured to point to VPS
```

### MySQL Database (if using Hostinger's service)
```
MySQL Host: ________________
MySQL Username: ________________
MySQL Password: ________________
Database Name: wedding_db (recommended)
```

## 🌐 External Service Accounts Required

### 1. Cloudinary (Media Storage)
**Sign up at: https://cloudinary.com**
```
Cloud Name: ________________
API Key: ________________
API Secret: ________________
```

**How to get Cloudinary credentials:**
1. Create free account at cloudinary.com
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

### 2. Resend (Email Service)
**Sign up at: https://resend.com**
```
API Key: ________________
```

**How to get Resend API key:**
1. Create free account at resend.com
2. Go to API Keys section
3. Create new API key
4. Copy the key (starts with "re_")

### 3. NextAuth Secret
**Generate secure random string:**
```bash
# Run this command to generate:
openssl rand -base64 32
```
```
Generated Secret: ________________
```

## 📋 GitHub Repository Secrets Setup

**Go to: GitHub Repository → Settings → Secrets and variables → Actions**

Add these secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `VPS_HOST` | [Your VPS IP] | Server IP address |
| `VPS_USERNAME` | `deploy` | SSH username (created by setup script) |
| `VPS_SSH_KEY` | [SSH Private Key] | Private key for server access |
| `VPS_PORT` | `22` | SSH port number |
| `DATABASE_URL` | `mysql://wedding_user:password@localhost:3306/wedding_db` | Database connection string |
| `NEXTAUTH_SECRET` | [Generated secret] | JWT signing key |
| `NEXTAUTH_URL` | `https://yourdomain.com` | Your website URL |
| `RESEND_API_KEY` | [Resend API key] | Email service key |
| `CLOUDINARY_CLOUD_NAME` | [Cloudinary cloud name] | Media storage cloud name |
| `CLOUDINARY_API_KEY` | [Cloudinary API key] | Media storage API key |
| `CLOUDINARY_API_SECRET` | [Cloudinary API secret] | Media storage API secret |

## ✅ Pre-deployment Checklist

- [ ] VPS is accessible via SSH
- [ ] Domain is pointing to VPS IP address
- [ ] Cloudinary account created and credentials obtained
- [ ] Resend account created and API key obtained
- [ ] NextAuth secret generated
- [ ] All GitHub secrets configured
- [ ] MySQL database service is available

## 🚀 Quick Deployment Commands

### Step 1: Server Setup (run as root)
```bash
curl -sSL https://raw.githubusercontent.com/syed-reza98/Sharothee-Wedding/main/deployment/01-server-setup.sh | bash
```

### Step 2: Update domain name
```bash
nano /etc/nginx/sites-available/wedding
# Replace 'yourdomain.com' with actual domain
```

### Step 3: SSL Certificate
```bash
./deployment/03-setup-ssl.sh yourdomain.com
```

### Step 4: Deploy Application
Push to main branch or run manually:
```bash
su - deploy
./deployment/02-deploy-app.sh
```

## 📞 Support Information

If you encounter issues during deployment:

1. **Check the deployment logs**: `/var/www/wedding/logs/`
2. **Review the README**: `deployment/README.md`
3. **Common issues**: See troubleshooting section in README
4. **Contact**: Create an issue in the GitHub repository

---

**🎉 Ready to deploy? Follow the step-by-step guide in `deployment/README.md`**