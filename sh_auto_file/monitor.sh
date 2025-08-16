#!/bin/bash

# Wedding Website Monitoring Script
# Run every 5 minutes via cron

LOG_FILE="/var/log/wedding-monitor.log"
ALERT_EMAIL="admin@arvinwedsincia.com"

echo "$(date): Starting health check..." >> $LOG_FILE

# Check if application is responding
APP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://arvinwedsincia.com/api/health)

if [ "$APP_STATUS" != "200" ]; then
    echo "$(date): ERROR - Application not responding (Status: $APP_STATUS)" >> $LOG_FILE
    # Restart PM2 process
    pm2 restart sharothee-wedding
    echo "$(date): PM2 restart attempted" >> $LOG_FILE
fi

# Check disk space (alert if > 80%)
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 80 ]; then
    echo "$(date): WARNING - Disk usage at ${DISK_USAGE}%" >> $LOG_FILE
fi

# Check memory usage
MEMORY_USAGE=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
if [ "$MEMORY_USAGE" -gt 90 ]; then
    echo "$(date): WARNING - Memory usage at ${MEMORY_USAGE}%" >> $LOG_FILE
fi

echo "$(date): Health check completed" >> $LOG_FILE
