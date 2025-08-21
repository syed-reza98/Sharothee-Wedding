# 🗄️ Daily Backup Strategy for Wedding Website

**Project:** Sharothee Wedding Website  
**VPS:** Hostinger KVM 1 (31.97.189.238)  
**Goal:** Automated daily backups to free cloud storage  
**Target:** 100% data recovery capability with zero manual intervention  

---

## 📊 Current Data Inventory

### 🗂️ Critical Data Assets

**Application Files:**
- Next.js application: `/var/www/wedding/client/`
- Configuration files: `.env.local`, `nginx.conf`, `ecosystem.config.js`
- SSL certificates: `/etc/letsencrypt/`
- Custom scripts: `/opt/wedding-scripts/`

**Database:**
- Production MySQL: `wedding_db` (~50MB)
- User data: Guests, RSVPs, contacts, media metadata
- Admin data: Settings, configurations

**Media Files:**
- Photo gallery: `/var/www/wedding/uploads/photos/` (~2GB)
- Videos: `/var/www/wedding/uploads/videos/` (~5GB)
- Documents: `/var/www/wedding/uploads/docs/` (~100MB)

**System Configurations:**
- Nginx configurations: `/etc/nginx/sites-available/`
- PM2 configurations: `~/.pm2/`
- Cron jobs: `/etc/crontab`

**Total Estimated Size:** ~8GB (growing 1GB/month)

---

## 🎯 Free Cloud Storage Solutions

### 🥇 Primary: Backblaze B2 (10GB Free)

**Why Backblaze B2:**
- 10GB free storage (sufficient for 1+ year)
- S3-compatible API
- $0.005/GB after free tier
- Excellent CLI tools
- Reliable for business use

**Setup Process:**

```bash
# Install Backblaze B2 CLI
curl -s https://raw.githubusercontent.com/Backblaze/B2_Command_Line_Tool/master/b2 > /usr/local/bin/b2
chmod +x /usr/local/bin/b2

# Create bucket for wedding backups
b2 create_bucket wedding-daily-backups allPrivate

# Set up application key (scope to bucket only)
b2 authorize_account <applicationKeyId> <applicationKey>
```

### 🥈 Secondary: Google Drive (15GB Free)

**Using rclone for Google Drive integration:**

```bash
# Install rclone
curl https://rclone.org/install.sh | sudo bash

# Configure Google Drive
rclone config
# Select Google Drive, follow OAuth flow
# Create remote named "gdrive"
```

### 🥉 Tertiary: pCloud (10GB Free)

**Using rclone for pCloud:**

```bash
# Configure pCloud in rclone
rclone config
# Select pCloud, enter credentials
# Create remote named "pcloud"
```

---

## 🛠️ Backup Architecture

### 📋 Backup Strategy Overview

**Multi-Tier Backup System:**
1. **Local Snapshots** (VPS disk): 7 days retention
2. **Primary Cloud** (Backblaze B2): 30 days retention
3. **Secondary Cloud** (Google Drive): 14 days retention
4. **Tertiary Cloud** (pCloud): 7 days retention

**Backup Schedule:**
- **Daily:** Full application + database backup
- **Weekly:** Complete system snapshot
- **Monthly:** Archive backups with extended retention

### 🔧 Backup Scripts

#### 1. Main Backup Script

```bash
#!/bin/bash
# File: /opt/wedding-backup/daily-backup.sh

set -e

# Configuration
BACKUP_DIR="/tmp/wedding-backup"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_NAME="wedding-backup-$DATE"
LOG_FILE="/var/log/wedding-backup.log"

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "Starting daily backup process..."

# Create backup directory
mkdir -p "$BACKUP_DIR"
cd "$BACKUP_DIR"

# 1. Database Backup
log "Backing up MySQL database..."
mysqldump \
    --single-transaction \
    --routines \
    --triggers \
    --all-databases \
    --user=root \
    --password="$MYSQL_ROOT_PASSWORD" \
    > "$BACKUP_NAME-database.sql"

# 2. Application Files Backup
log "Backing up application files..."
tar -czf "$BACKUP_NAME-application.tar.gz" \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='*.log' \
    /var/www/wedding/

# 3. Media Files Backup
log "Backing up media files..."
tar -czf "$BACKUP_NAME-media.tar.gz" \
    /var/www/wedding/uploads/

# 4. Configuration Backup
log "Backing up configurations..."
tar -czf "$BACKUP_NAME-config.tar.gz" \
    /etc/nginx/sites-available/ \
    /etc/letsencrypt/ \
    /home/root/.pm2/ \
    /opt/wedding-scripts/ \
    /etc/crontab

# 5. System Information
log "Collecting system information..."
cat > "$BACKUP_NAME-system-info.txt" << EOF
Backup Date: $(date)
Server: $(hostname)
OS: $(lsb_release -d | cut -f2)
Kernel: $(uname -r)
Disk Usage: $(df -h / | tail -1)
Memory: $(free -h | grep Mem)
Uptime: $(uptime)

Installed Packages:
$(dpkg -l | grep -E "(nginx|mysql|nodejs|npm)" || echo "No packages found")

Process Status:
$(pm2 status)

Git Status:
$(cd /var/www/wedding && git log --oneline -5)
EOF

# 6. Create final archive
log "Creating final backup archive..."
tar -czf "$BACKUP_NAME.tar.gz" \
    "$BACKUP_NAME-database.sql" \
    "$BACKUP_NAME-application.tar.gz" \
    "$BACKUP_NAME-media.tar.gz" \
    "$BACKUP_NAME-config.tar.gz" \
    "$BACKUP_NAME-system-info.txt"

# Get file size
BACKUP_SIZE=$(du -h "$BACKUP_NAME.tar.gz" | cut -f1)
log "Backup created: $BACKUP_NAME.tar.gz ($BACKUP_SIZE)"

# 7. Upload to cloud storage
log "Uploading to cloud storage..."

# Upload to Backblaze B2
b2 upload_file wedding-daily-backups "$BACKUP_NAME.tar.gz" "daily/$BACKUP_NAME.tar.gz"
log "Uploaded to Backblaze B2"

# Upload to Google Drive (every other day to save space)
if [ $(($(date +%d) % 2)) -eq 0 ]; then
    rclone copy "$BACKUP_NAME.tar.gz" gdrive:wedding-backups/daily/
    log "Uploaded to Google Drive"
fi

# Upload to pCloud (weekly)
if [ $(date +%u) -eq 7 ]; then
    rclone copy "$BACKUP_NAME.tar.gz" pcloud:wedding-backups/weekly/
    log "Uploaded to pCloud"
fi

# 8. Cleanup local files
log "Cleaning up local backup files..."
rm -f "$BACKUP_NAME"*
rm -f *.sql *.tar.gz

# 9. Local retention (keep last 7 days on VPS)
find /opt/wedding-backup/local/ -name "wedding-backup-*.tar.gz" -mtime +7 -delete

# Copy current backup to local retention
cp "$BACKUP_NAME.tar.gz" /opt/wedding-backup/local/

log "Daily backup completed successfully!"

# 10. Send notification email
if command -v mail >/dev/null; then
    echo "Daily backup completed successfully at $(date). Backup size: $BACKUP_SIZE" | \
    mail -s "Wedding Website Backup - $(date +%Y-%m-%d)" hello@inciaandarvins.wedding
fi
```

#### 2. Cloud Retention Management

```bash
#!/bin/bash
# File: /opt/wedding-backup/cleanup-old-backups.sh

set -e

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a /var/log/wedding-backup.log
}

log "Starting backup cleanup process..."

# Backblaze B2 cleanup (keep 30 days)
log "Cleaning up Backblaze B2 old backups..."
b2 ls wedding-daily-backups --recursive | \
grep -E "wedding-backup-[0-9]{4}-[0-9]{2}-[0-9]{2}" | \
while read -r line; do
    filename=$(echo "$line" | awk '{print $NF}')
    date_str=$(echo "$filename" | grep -oE "[0-9]{4}-[0-9]{2}-[0-9]{2}")
    file_date=$(date -d "$date_str" +%s)
    cutoff_date=$(date -d "30 days ago" +%s)
    
    if [ "$file_date" -lt "$cutoff_date" ]; then
        b2 delete_file_version "$filename" "$(echo "$line" | awk '{print $1}')"
        log "Deleted old backup from B2: $filename"
    fi
done

# Google Drive cleanup (keep 14 days)
log "Cleaning up Google Drive old backups..."
rclone delete gdrive:wedding-backups/daily/ --min-age 14d

# pCloud cleanup (keep 7 days)
log "Cleaning up pCloud old backups..."
rclone delete pcloud:wedding-backups/weekly/ --min-age 7d

log "Backup cleanup completed!"
```

#### 3. Backup Verification Script

```bash
#!/bin/bash
# File: /opt/wedding-backup/verify-backup.sh

set -e

BACKUP_NAME="$1"
if [ -z "$BACKUP_NAME" ]; then
    echo "Usage: $0 <backup-name>"
    exit 1
fi

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "Verifying backup: $BACKUP_NAME"

# Create temporary directory for verification
VERIFY_DIR="/tmp/backup-verify-$$"
mkdir -p "$VERIFY_DIR"
cd "$VERIFY_DIR"

# Download backup from B2
log "Downloading backup from Backblaze B2..."
b2 download_file_by_name wedding-daily-backups "daily/$BACKUP_NAME.tar.gz" "$BACKUP_NAME.tar.gz"

# Extract and verify contents
log "Extracting backup archive..."
tar -tzf "$BACKUP_NAME.tar.gz" > file_list.txt

# Check required files
REQUIRED_FILES=(
    "$BACKUP_NAME-database.sql"
    "$BACKUP_NAME-application.tar.gz"
    "$BACKUP_NAME-media.tar.gz"
    "$BACKUP_NAME-config.tar.gz"
    "$BACKUP_NAME-system-info.txt"
)

ALL_GOOD=true
for file in "${REQUIRED_FILES[@]}"; do
    if grep -q "$file" file_list.txt; then
        log "✓ Found required file: $file"
    else
        log "✗ Missing required file: $file"
        ALL_GOOD=false
    fi
done

# Extract and test database
log "Testing database backup..."
tar -xzf "$BACKUP_NAME.tar.gz" "$BACKUP_NAME-database.sql"
if mysql --user=root --password="$MYSQL_ROOT_PASSWORD" -e "source $BACKUP_NAME-database.sql" test_restore_db; then
    log "✓ Database backup is valid"
    mysql --user=root --password="$MYSQL_ROOT_PASSWORD" -e "DROP DATABASE test_restore_db"
else
    log "✗ Database backup is corrupted"
    ALL_GOOD=false
fi

# Cleanup
rm -rf "$VERIFY_DIR"

if [ "$ALL_GOOD" = true ]; then
    log "✅ Backup verification successful!"
    exit 0
else
    log "❌ Backup verification failed!"
    exit 1
fi
```

---

## ⚙️ Installation & Setup

### 1. Initial Setup

```bash
# Create backup directories
sudo mkdir -p /opt/wedding-backup/{scripts,local}
sudo mkdir -p /var/log

# Install required tools
sudo apt update
sudo apt install -y curl wget mysql-client mail-utils

# Install Backblaze B2 CLI
curl -s https://raw.githubusercontent.com/Backblaze/B2_Command_Line_Tool/master/b2 > /tmp/b2
sudo mv /tmp/b2 /usr/local/bin/b2
sudo chmod +x /usr/local/bin/b2

# Install rclone
curl https://rclone.org/install.sh | sudo bash

# Set up environment variables
sudo tee /opt/wedding-backup/.env << EOF
MYSQL_ROOT_PASSWORD=your_mysql_password
B2_APPLICATION_KEY_ID=your_b2_key_id
B2_APPLICATION_KEY=your_b2_application_key
EOF

sudo chmod 600 /opt/wedding-backup/.env
```

### 2. Configure Cloud Storage

```bash
# Configure Backblaze B2
source /opt/wedding-backup/.env
b2 authorize_account $B2_APPLICATION_KEY_ID $B2_APPLICATION_KEY
b2 create_bucket wedding-daily-backups allPrivate

# Configure Google Drive with rclone
rclone config
# Follow interactive setup for Google Drive

# Configure pCloud with rclone
rclone config
# Follow interactive setup for pCloud
```

### 3. Install Backup Scripts

```bash
# Copy scripts to backup directory
sudo cp daily-backup.sh /opt/wedding-backup/scripts/
sudo cp cleanup-old-backups.sh /opt/wedding-backup/scripts/
sudo cp verify-backup.sh /opt/wedding-backup/scripts/

# Make scripts executable
sudo chmod +x /opt/wedding-backup/scripts/*.sh
```

### 4. Set Up Cron Jobs

```bash
# Add to root crontab
sudo crontab -e

# Add these lines:
# Daily backup at 2 AM
0 2 * * * /opt/wedding-backup/scripts/daily-backup.sh

# Weekly cleanup on Sunday at 3 AM
0 3 * * 0 /opt/wedding-backup/scripts/cleanup-old-backups.sh

# Monthly verification on 1st day at 4 AM
0 4 1 * * /opt/wedding-backup/scripts/verify-backup.sh wedding-backup-$(date -d "yesterday" +%Y-%m-%d_02-00-00)
```

---

## 📊 Monitoring & Alerting

### 1. Backup Status Dashboard

```bash
#!/bin/bash
# File: /opt/wedding-backup/backup-status.sh

echo "=== Wedding Website Backup Status ==="
echo "Date: $(date)"
echo ""

# Check last backup
LAST_BACKUP=$(find /opt/wedding-backup/local/ -name "wedding-backup-*.tar.gz" -printf '%T@ %p\n' | sort -n | tail -1 | cut -d' ' -f2-)
if [ -n "$LAST_BACKUP" ]; then
    echo "✓ Last Local Backup: $(basename "$LAST_BACKUP")"
    echo "  Size: $(du -h "$LAST_BACKUP" | cut -f1)"
    echo "  Date: $(stat -c %y "$LAST_BACKUP")"
else
    echo "❌ No local backups found"
fi

echo ""

# Check cloud storage status
echo "Cloud Storage Status:"

# Backblaze B2
B2_COUNT=$(b2 ls wedding-daily-backups --recursive | wc -l)
echo "  Backblaze B2: $B2_COUNT files"

# Google Drive
GDRIVE_COUNT=$(rclone ls gdrive:wedding-backups/daily/ | wc -l)
echo "  Google Drive: $GDRIVE_COUNT files"

# pCloud
PCLOUD_COUNT=$(rclone ls pcloud:wedding-backups/weekly/ | wc -l)
echo "  pCloud: $PCLOUD_COUNT files"

echo ""

# Disk usage
echo "Disk Usage:"
df -h / | tail -1

echo ""

# Recent backup log
echo "Recent Log Entries:"
tail -10 /var/log/wedding-backup.log
```

### 2. Backup Health Check

```bash
#!/bin/bash
# File: /opt/wedding-backup/health-check.sh

HEALTH_FILE="/tmp/backup-health"
ERROR_COUNT=0

# Check if backup ran in last 25 hours
LAST_BACKUP_TIME=$(find /opt/wedding-backup/local/ -name "wedding-backup-*.tar.gz" -printf '%T@\n' | sort -n | tail -1)
CURRENT_TIME=$(date +%s)
HOURS_SINCE_BACKUP=$(( (CURRENT_TIME - ${LAST_BACKUP_TIME:-0}) / 3600 ))

if [ $HOURS_SINCE_BACKUP -gt 25 ]; then
    echo "❌ Last backup is $HOURS_SINCE_BACKUP hours old (expected <25)" >> $HEALTH_FILE
    ERROR_COUNT=$((ERROR_COUNT + 1))
else
    echo "✓ Backup recency check passed" >> $HEALTH_FILE
fi

# Check cloud storage accessibility
if ! b2 ls wedding-daily-backups >/dev/null 2>&1; then
    echo "❌ Cannot access Backblaze B2" >> $HEALTH_FILE
    ERROR_COUNT=$((ERROR_COUNT + 1))
else
    echo "✓ Backblaze B2 accessible" >> $HEALTH_FILE
fi

if ! rclone ls gdrive:wedding-backups/daily/ >/dev/null 2>&1; then
    echo "❌ Cannot access Google Drive" >> $HEALTH_FILE
    ERROR_COUNT=$((ERROR_COUNT + 1))
else
    echo "✓ Google Drive accessible" >> $HEALTH_FILE
fi

# Check disk space (warn if >80% full)
DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "⚠️  Disk usage is ${DISK_USAGE}% (warn >80%)" >> $HEALTH_FILE
    ERROR_COUNT=$((ERROR_COUNT + 1))
else
    echo "✓ Disk space check passed (${DISK_USAGE}%)" >> $HEALTH_FILE
fi

# Generate health report
cat $HEALTH_FILE

if [ $ERROR_COUNT -gt 0 ]; then
    echo "❌ Health check failed with $ERROR_COUNT errors"
    # Send alert email
    mail -s "Wedding Website Backup Health Alert" hello@inciaandarvins.wedding < $HEALTH_FILE
    exit 1
else
    echo "✅ All health checks passed"
    exit 0
fi
```

---

## 🔄 Disaster Recovery Plan

### 1. Complete System Recovery

```bash
#!/bin/bash
# File: /opt/wedding-backup/disaster-recovery.sh

BACKUP_NAME="$1"
if [ -z "$BACKUP_NAME" ]; then
    echo "Usage: $0 <backup-name>"
    echo "Example: $0 wedding-backup-2024-08-15_02-00-00"
    exit 1
fi

echo "🚨 DISASTER RECOVERY MODE"
echo "Restoring from backup: $BACKUP_NAME"
echo "This will overwrite the current system!"
read -p "Are you sure? (type 'YES' to continue): " confirm

if [ "$confirm" != "YES" ]; then
    echo "Recovery cancelled"
    exit 1
fi

# Create recovery directory
RECOVERY_DIR="/tmp/disaster-recovery"
mkdir -p "$RECOVERY_DIR"
cd "$RECOVERY_DIR"

# Download backup
echo "📥 Downloading backup from cloud..."
b2 download_file_by_name wedding-daily-backups "daily/$BACKUP_NAME.tar.gz" "$BACKUP_NAME.tar.gz"

# Extract backup
echo "📦 Extracting backup..."
tar -xzf "$BACKUP_NAME.tar.gz"

# Stop services
echo "⏹️  Stopping services..."
pm2 stop all
systemctl stop nginx

# Restore database
echo "🗄️  Restoring database..."
mysql --user=root --password="$MYSQL_ROOT_PASSWORD" < "$BACKUP_NAME-database.sql"

# Restore application
echo "📂 Restoring application files..."
rm -rf /var/www/wedding/client/*
tar -xzf "$BACKUP_NAME-application.tar.gz" -C /

# Restore media
echo "🖼️  Restoring media files..."
rm -rf /var/www/wedding/uploads/*
tar -xzf "$BACKUP_NAME-media.tar.gz" -C /

# Restore configurations
echo "⚙️  Restoring configurations..."
tar -xzf "$BACKUP_NAME-config.tar.gz" -C /

# Rebuild application
echo "🔨 Rebuilding application..."
cd /var/www/wedding/client
npm ci --only=production
npm run build

# Restart services
echo "▶️  Restarting services..."
systemctl start nginx
pm2 start ecosystem.config.js

# Verify recovery
echo "✅ Verifying recovery..."
sleep 10
if curl -f http://localhost:3000/api/health; then
    echo "🎉 Recovery completed successfully!"
else
    echo "❌ Recovery verification failed!"
    exit 1
fi

# Cleanup
rm -rf "$RECOVERY_DIR"

echo "📧 Sending recovery notification..."
echo "Disaster recovery completed successfully at $(date)" | \
mail -s "Wedding Website Recovery Completed" hello@inciaandarvins.wedding
```

### 2. Partial Recovery Options

```bash
# Database only recovery
mysql --user=root --password="$MYSQL_ROOT_PASSWORD" wedding_db < backup-database.sql

# Application only recovery
tar -xzf backup-application.tar.gz -C /var/www/wedding/

# Media only recovery
tar -xzf backup-media.tar.gz -C /var/www/wedding/uploads/

# Configuration only recovery
tar -xzf backup-config.tar.gz -C /etc/
```

---

## 📈 Storage Usage Optimization

### 1. Compression Strategies

```bash
# High compression for older backups
tar -czf --best backup.tar.gz files/

# Differential backups (only changed files)
rsync -av --delete --link-dest=../previous-backup/ source/ current-backup/
```

### 2. Retention Policies

**Local VPS Storage:**
- Daily: 7 days (7 files × ~1GB = 7GB)
- Emergency space: Delete oldest if >90% disk usage

**Cloud Storage Tiers:**
- **Backblaze B2** (Primary): 30 days retention
- **Google Drive** (Secondary): 14 days retention (every other day)
- **pCloud** (Tertiary): 7 days retention (weekly)

### 3. Space Monitoring

```bash
# Monitor and alert on storage usage
check_storage() {
    local service="$1"
    local threshold="$2"
    
    case "$service" in
        "b2")
            USED=$(b2 ls wedding-daily-backups --recursive | wc -l)
            if [ $USED -gt $threshold ]; then
                echo "Warning: B2 has $USED files (threshold: $threshold)"
            fi
            ;;
        "gdrive")
            USED=$(rclone size gdrive:wedding-backups/ --json | jq -r '.bytes')
            USED_GB=$((USED / 1024 / 1024 / 1024))
            if [ $USED_GB -gt $threshold ]; then
                echo "Warning: Google Drive using ${USED_GB}GB (threshold: ${threshold}GB)"
            fi
            ;;
    esac
}

check_storage "b2" 30
check_storage "gdrive" 10
```

---

## 🚀 Implementation Timeline

**Phase 1 (Day 1): Setup Infrastructure**
- Install backup tools and dependencies
- Configure cloud storage accounts
- Set up directory structure

**Phase 2 (Day 2): Deploy Scripts**
- Install and test backup scripts
- Configure cron jobs
- Test manual backup

**Phase 3 (Day 3): Validation**
- Test cloud uploads
- Verify backup integrity
- Test partial recovery

**Phase 4 (Day 4): Monitoring**
- Set up health checks
- Configure alerts
- Document recovery procedures

**Phase 5 (Day 5-7): Testing**
- Full disaster recovery test
- Performance optimization
- Documentation finalization

**Total Setup Time:** 1 week  
**Ongoing Maintenance:** <1 hour/month  
**Storage Cost:** $0 (within free tiers)  

---

## 📋 Backup Checklist

### Daily Automated Tasks
- [ ] Application files backup
- [ ] Database backup
- [ ] Media files backup
- [ ] Configuration backup
- [ ] Upload to primary cloud (Backblaze B2)
- [ ] Upload to secondary cloud (Google Drive - every other day)
- [ ] Local retention management
- [ ] Backup verification
- [ ] Health status logging

### Weekly Automated Tasks
- [ ] Upload to tertiary cloud (pCloud)
- [ ] Old backup cleanup
- [ ] Storage usage report
- [ ] Recovery test (automated)

### Monthly Manual Tasks
- [ ] Full disaster recovery test
- [ ] Backup strategy review
- [ ] Storage cost optimization
- [ ] Documentation updates

**Benefits:**
- 100% automated backup process
- Multi-cloud redundancy
- Zero ongoing costs
- Quick disaster recovery (1-2 hours)
- Complete data protection

**Next Steps:**
1. Set up cloud storage accounts
2. Install and configure backup scripts
3. Test backup and recovery process
4. Monitor for 1 week to ensure reliability
5. Document team training materials
