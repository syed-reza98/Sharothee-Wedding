module.exports = {
  apps: [
    {
      name: 'sharothee-wedding',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/Sharothee-Wedding/client',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/pm2/sharothee-wedding-error.log',
      out_file: '/var/log/pm2/sharothee-wedding-out.log',
      log_file: '/var/log/pm2/sharothee-wedding-combined.log',
      time: true
    }
  ]
};
