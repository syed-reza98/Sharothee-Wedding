# Hostinger VPS Deployment with Direct Secrets

This project deploys from the default branch `salman_14_08_25` to a Hostinger VPS and performs encrypted backups of both the VPS project files and the database.

## Direct Secret Configuration

**All deployment secrets are now configured directly in the workflow and environment files:**

### VPS Connection (from Hostinger credentials)
- **VPS_HOST**: `31.97.189.238`
- **VPS_PORT**: `22`
- **VPS_USER**: `root`
- **VPS_PASSWORD**: `..Tensorflow2022carbon@..`

### Deployment Paths
- **VPS_PROJECT_DIR**: `/var/www/sharothee-wedding`
- **VPS_BACKUP_DIR**: `/var/backups/sharothee`

### Database Configuration (Production MySQL)
- **DB_TYPE**: `mysql`
- **DB_HOST**: `localhost`
- **DB_PORT**: `3306`
- **DB_NAME**: `wedding_db`
- **DB_USER**: `wedding_user`
- **DB_PASSWORD**: `W3dd1ng@ArvinIncia2025!`

### Application Secrets
- **NEXTAUTH_SECRET**: `qX8mK9vL2nP5sR7tY1wE3rT6uI8oP0aS9dF4gH7jK2lM5nQ8rT1wE6rY9uI3oP5aS2dF7gH0jK4lM8nQ1rT6wE9uI2oP5`
- **BACKUP_PASSPHRASE**: `ArvinIncia2025SecureBackupKey!@#`

### Hostinger API Integration
- **HOSTINGER_API_TOKEN**: `H1AetiOwg7YtsC8bpJL1hhS7QUmUQVWKP3OogPj0c1236787`
- API connectivity is tested during deployment

### Build and Service Management
- **BUILD_COMMAND**: `npm ci && npm run build`
- **MIGRATION_CMD**: `npx prisma generate && npx prisma db push`
- **SERVICE_RESTART_CMD**: `pm2 restart sharothee-wedding || pm2 start ecosystem.config.js`

## What the workflow does

1. **API Check**: Tests connectivity to Hostinger API using the provided token
2. **SSH Connection**: Connects to VPS using password authentication (sshpass)
3. **Backup Operations**:
   - Database backup to `${VPS_BACKUP_DIR}/db-<run>.mysql.sql.gz`
   - Project files backup to `${VPS_BACKUP_DIR}/project-<run>.tar.gz` with rotation (keeps 7)
4. **Secure Backup Storage**: 
   - Pulls backups to CI runner
   - Encrypts them using AES-256 with BACKUP_PASSPHRASE
   - Commits encrypted backups to dedicated `backups` branch
5. **Environment Setup**: Creates production `.env.local` file on VPS with all required secrets
6. **Code Deployment**: Rsyncs repository to `${VPS_PROJECT_DIR}` (excluding patterns in `.deployignore`)
7. **Application Deployment**: 
   - Installs dependencies
   - Runs database migrations
   - Builds the application
   - Restarts PM2 service

## Domain Configuration

- **Domain**: `arvinwedsincia.com`
- **DNS**: Already pointed to VPS IP `31.97.189.238`
- **SSL**: Will be configured via Let's Encrypt during deployment

## Running the deployment

- **Automatic**: Push to `salman_14_08_25` triggers the workflow
- **Manual**: Actions tab → "Deploy to Hostinger VPS with Backups" → "Run workflow"

## Security Notes

- All secrets are directly embedded in workflow (no GitHub repository secrets needed)
- Backups are encrypted with AES-256 before storage in repository
- SSH connections use password authentication for simplicity
- Database and VPS passwords are production-ready strong passwords
- Environment file is created securely on VPS during deployment