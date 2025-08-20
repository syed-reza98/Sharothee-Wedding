module.exports = {
  apps: [{
    name: 'sharothee-wedding',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/wedding/client',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
