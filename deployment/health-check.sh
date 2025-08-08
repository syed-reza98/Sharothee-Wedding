#!/bin/bash

# Monitoring and Health Check Script
# Run this script periodically to monitor the application

APP_NAME="wedding-website"
APP_URL="https://yourdomain.com"
ALERT_EMAIL="admin@yourdomain.com"
LOG_FILE="/var/www/wedding/logs/health-check.log"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Function to send alert (requires mail command)
send_alert() {
    local subject="$1"
    local message="$2"
    
    echo "$message" | mail -s "$subject" "$ALERT_EMAIL" 2>/dev/null || \
    echo "Failed to send email alert: $subject - $message" >> "$LOG_FILE"
}

# Check if PM2 process is running
check_pm2_status() {
    log_message "Checking PM2 status..."
    
    if ! pm2 describe "$APP_NAME" &>/dev/null; then
        log_message "ERROR: PM2 process '$APP_NAME' is not running"
        send_alert "Wedding Website Down" "PM2 process is not running. Attempting restart..."
        
        # Attempt to restart
        pm2 start ecosystem.config.js --env production
        sleep 10
        
        if pm2 describe "$APP_NAME" &>/dev/null; then
            log_message "SUCCESS: PM2 process restarted successfully"
            send_alert "Wedding Website Recovered" "PM2 process was restarted successfully"
        else
            log_message "CRITICAL: Failed to restart PM2 process"
            send_alert "CRITICAL: Wedding Website Failed to Restart" "Manual intervention required"
            return 1
        fi
    else
        log_message "OK: PM2 process is running"
    fi
}

# Check HTTP response
check_http_response() {
    log_message "Checking HTTP response..."
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$APP_URL/api/health" --max-time 10)
    
    if [ "$response" = "200" ]; then
        log_message "OK: HTTP health check passed (Status: $response)"
    else
        log_message "ERROR: HTTP health check failed (Status: $response)"
        send_alert "Wedding Website HTTP Error" "Health check failed with status: $response"
        return 1
    fi
}

# Check disk space
check_disk_space() {
    log_message "Checking disk space..."
    
    usage=$(df /var/www/wedding | awk 'NR==2 {print $5}' | sed 's/%//')
    
    if [ "$usage" -gt 80 ]; then
        log_message "WARNING: Disk usage is ${usage}%"
        send_alert "High Disk Usage" "Disk usage is at ${usage}% - cleanup may be required"
    else
        log_message "OK: Disk usage is ${usage}%"
    fi
}

# Check memory usage
check_memory_usage() {
    log_message "Checking memory usage..."
    
    memory_usage=$(free | awk 'NR==2{printf "%.2f", $3*100/$2}')
    memory_int=${memory_usage%.*}
    
    if [ "$memory_int" -gt 85 ]; then
        log_message "WARNING: Memory usage is ${memory_usage}%"
        send_alert "High Memory Usage" "Memory usage is at ${memory_usage}%"
        
        # Show top processes
        ps aux --sort=-%mem | head -10 >> "$LOG_FILE"
    else
        log_message "OK: Memory usage is ${memory_usage}%"
    fi
}

# Check SSL certificate expiry
check_ssl_expiry() {
    log_message "Checking SSL certificate expiry..."
    
    domain=$(echo "$APP_URL" | sed 's|https://||' | sed 's|http://||')
    expiry_date=$(echo | openssl s_client -servername "$domain" -connect "$domain":443 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
    expiry_timestamp=$(date -d "$expiry_date" +%s)
    current_timestamp=$(date +%s)
    days_until_expiry=$(( (expiry_timestamp - current_timestamp) / 86400 ))
    
    if [ "$days_until_expiry" -lt 30 ]; then
        log_message "WARNING: SSL certificate expires in $days_until_expiry days"
        send_alert "SSL Certificate Expiring Soon" "SSL certificate for $domain expires in $days_until_expiry days"
    else
        log_message "OK: SSL certificate valid for $days_until_expiry days"
    fi
}

# Check log file sizes
check_log_sizes() {
    log_message "Checking log file sizes..."
    
    for logfile in /var/www/wedding/logs/*.log; do
        if [ -f "$logfile" ]; then
            size=$(du -m "$logfile" | cut -f1)
            if [ "$size" -gt 100 ]; then
                log_message "WARNING: Log file $logfile is ${size}MB"
                # Rotate large log files
                mv "$logfile" "${logfile}.old"
                touch "$logfile"
                chown deploy:deploy "$logfile"
                pm2 reload "$APP_NAME"
                log_message "INFO: Rotated large log file $logfile"
            fi
        fi
    done
}

# Main health check
main() {
    log_message "=== Starting health check ==="
    
    # Run all checks
    check_pm2_status
    check_http_response
    check_disk_space
    check_memory_usage
    check_ssl_expiry
    check_log_sizes
    
    log_message "=== Health check completed ==="
    echo ""
}

# Run the main function
main