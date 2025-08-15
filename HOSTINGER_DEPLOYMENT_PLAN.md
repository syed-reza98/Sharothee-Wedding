# Hostinger VPS Deployment Plan for Sharothee Wedding Website

## Overview
This document provides a comprehensive deployment plan for deploying the Sharothee Wedding Website to Hostinger VPS with integrated domain and DNS configuration.

## Prerequisites from Hostinger
### VPS Requirements
- **Operating System**: Ubuntu 20.04 LTS or higher
- **RAM**: Minimum 2GB (recommended 4GB+)
- **Storage**: Minimum 20GB SSD
- **CPU**: 2+ cores recommended
- **Domain**: Already pointed to VPS (DNS configured)

### Required Hostinger Information
1. **VPS Access Credentials**:
   - SSH IP Address: `your-vps-ip`
   - SSH Username: `root` or `your-username`
   - SSH Password or Private Key
   - SSH Port: (usually 22 or custom)

2. **Domain Information**:
   - Domain name: `arvinwedsincia.com`
   - DNS configuration status: ✅ Already configured
   - SSL certificate requirement: Required

3. **Database Credentials** (if using Hostinger MySQL):
   - MySQL Host: `localhost` or Hostinger MySQL host
   - MySQL Username: `your-mysql-username`
   - MySQL Password: `your-mysql-password`
   - Database Name: `wedding_db`

## Required GitHub Secrets
Configure these secrets in your GitHub repository:

### Server Access
- `VPS_HOST`: Your VPS IP address
- `VPS_USERNAME`: SSH username (usually root)
- `VPS_SSH_KEY`: Private SSH key for server access
- `VPS_PORT`: SSH port (usually 22)

### Application Environment
- `DATABASE_URL`: MySQL connection string
- `NEXTAUTH_SECRET`: Secure random string for NextAuth
- `NEXTAUTH_URL`: Your production domain URL
- `RESEND_API_KEY`: Email service API key
- `CLOUDINARY_CLOUD_NAME`: Media storage cloud name
- `CLOUDINARY_API_KEY`: Media storage API key
- `CLOUDINARY_API_SECRET`: Media storage API secret

## External Service Setup Required

### 1. Cloudinary Account (Media Storage)
- Sign up at: https://cloudinary.com
- Get credentials:
  - Cloud Name
  - API Key
  - API Secret

### 2. Resend Account (Email Service)
- Sign up at: https://resend.com
- Get API Key
- Verify sending domain (optional but recommended)

### 3. MySQL Database
- Option A: Use Hostinger's MySQL service
- Option B: Install MySQL on VPS
- Create database: `wedding_db`

## Deployment Steps

### Phase 1: Server Setup (One-time)
1. **Install Node.js 18+**
2. **Install MySQL** (if not using Hostinger's service)
3. **Install Nginx** (reverse proxy)
4. **Install PM2** (process manager)
5. **Configure Firewall**
6. **Setup SSL Certificate** (Let's Encrypt)

### Phase 2: Application Deployment
1. **Clone Repository**
2. **Install Dependencies**
3. **Configure Environment**
4. **Database Migration**
5. **Build Application**
6. **Configure Nginx**
7. **Start Application**

### Phase 3: Monitoring & Maintenance
1. **Setup Health Monitoring**
2. **Configure Backup Strategy**
3. **Setup Log Management**
4. **Performance Monitoring**

## Security Considerations
- SSL certificate for HTTPS
- Environment variable security
- Database access controls
- Server firewall configuration
- Regular security updates

## Maintenance Schedule
- **Daily**: Automated backups
- **Weekly**: Security updates
- **Monthly**: Performance review
- **Quarterly**: Full system audit

---

**Next Steps**: Follow the detailed setup scripts in the `/deployment` directory.