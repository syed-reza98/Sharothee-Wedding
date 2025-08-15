module.exports = {
  apps: [{
    name: 'wedding-website',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/wedding/current/client',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/www/wedding/logs/err.log',
    out_file: '/var/www/wedding/logs/out.log',
    log_file: '/var/www/wedding/logs/combined.log',
    time: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production'
    },
    // Health check configuration
    health_check_grace_period: 3000,
    health_check_interval: 30000,
    
    // Restart configuration
    min_uptime: '10s',
    max_restarts: 10,
    
    // Log configuration
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm Z'
  }]
};