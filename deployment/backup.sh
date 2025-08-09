#!/bin/bash

# Backup Script for Wedding Website
# Creates database backups and application file backups

BACKUP_DIR="/var/backups/wedding"
APP_DIR="/var/www/wedding"
DB_NAME="wedding_db"
DB_USER="wedding_user"
RETENTION_DAYS=30

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Database backup
backup_database() {
    log_message "Starting database backup..."
    
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_FILE="$BACKUP_DIR/db_backup_$TIMESTAMP.sql"
    
    # Create database dump
    # Check if database password is provided
    if [ -z "$DB_PASSWORD" ]; then
        echo "Please provide database password:"
        read -s DB_PASSWORD
    fi
    
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_FILE="$BACKUP_DIR/db_backup_$TIMESTAMP.sql"
    
    # Create temporary MySQL config file to avoid exposing password
    TMP_MYCNF=$(mktemp)
    cat > "$TMP_MYCNF" <<EOF
[client]
user=$DB_USER
password=$DB_PASSWORD
EOF

    # Create database dump using the config file
    mysqldump --defaults-extra-file="$TMP_MYCNF" "$DB_NAME" > "$BACKUP_FILE"
    local DUMP_STATUS=$?
    rm -f "$TMP_MYCNF"
    
    if [ $DUMP_STATUS -eq 0 ]; then
        # Compress the backup
        gzip "$BACKUP_FILE"
        log_message "Database backup completed: ${BACKUP_FILE}.gz"
    else
        log_message "ERROR: Database backup failed"
        exit 1
    fi
}

# Application files backup
backup_application() {
    log_message "Starting application backup..."
    
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_FILE="$BACKUP_DIR/app_backup_$TIMESTAMP.tar.gz"
    
    # Create application backup (exclude node_modules and logs)
    tar -czf "$BACKUP_FILE" \
        --exclude='node_modules' \
        --exclude='logs' \
        --exclude='.next' \
        --exclude='.git' \
        -C "$APP_DIR" .
    
    if [ $? -eq 0 ]; then
        log_message "Application backup completed: $BACKUP_FILE"
    else
        log_message "ERROR: Application backup failed"
        exit 1
    fi
}

# Cleanup old backups
cleanup_old_backups() {
    log_message "Cleaning up old backups (older than $RETENTION_DAYS days)..."
    
    # Remove old database backups
    find "$BACKUP_DIR" -name "db_backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete
    
    # Remove old application backups
    find "$BACKUP_DIR" -name "app_backup_*.tar.gz" -mtime +$RETENTION_DAYS -delete
    
    log_message "Cleanup completed"
}

# Main backup process
main() {
    log_message "=== Starting backup process ==="
    
    # Check if database password is provided
    if [ -z "$DB_PASSWORD" ]; then
        echo "Please provide database password:"
        read -s DB_PASSWORD
    fi
    
    backup_database
    backup_application
    cleanup_old_backups
    
    # Show backup directory size
    du -sh "$BACKUP_DIR"
    
    log_message "=== Backup process completed ==="
}

# Run the main function
main