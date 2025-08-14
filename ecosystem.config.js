module.exports = {
  apps: [{
    name: 'sharothee-wedding',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/sharothee-wedding',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      // Database configuration
      DATABASE_URL: 'mysql://wedding_user:W3dd1ng@ArvinIncia2025!@localhost:3306/wedding_db',
      
      // NextAuth configuration
      NEXTAUTH_SECRET: 'qX8mK9vL2nP5sR7tY1wE3rT6uI8oP0aS9dF4gH7jK2lM5nQ8rT1wE6rY9uI3oP5aS2dF7gH0jK4lM8nQ1rT6wE9uI2oP5',
      NEXTAUTH_URL: 'https://arvinwedsincia.com',
      
      // Application URLs
      NEXT_PUBLIC_APP_URL: 'https://arvinwedsincia.com',
      
      // Admin credentials
      ADMIN_EMAIL: 'admin@arvinwedsincia.com',
      ADMIN_PASSWORD: 'Admin123!@#',
      
      // External service placeholders (update with real values)
      RESEND_API_KEY: 're_placeholder_update_with_real_resend_api_key',
      CLOUDINARY_CLOUD_NAME: 'placeholder_cloudinary_name',
      CLOUDINARY_API_KEY: 'placeholder_cloudinary_api_key',
      CLOUDINARY_API_SECRET: 'placeholder_cloudinary_api_secret',
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: 'AIza_placeholder_google_maps_api_key'
    },
    error_file: '/var/log/pm2/sharothee-wedding-error.log',
    out_file: '/var/log/pm2/sharothee-wedding-out.log',
    log_file: '/var/log/pm2/sharothee-wedding.log',
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    
    // Restart configuration
    min_uptime: '10s',
    max_restarts: 10,
    
    // Advanced PM2 features
    kill_timeout: 1600,
    wait_ready: true,
    listen_timeout: 3000
  }]
};