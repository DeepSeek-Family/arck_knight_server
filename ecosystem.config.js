module.exports = {
  apps: [{
    name: 'arck-knight-backend',
    script: './dist/server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    // Auto restart configuration
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000,
    // Crash detection and recovery
    kill_timeout: 5000,
    listen_timeout: 3000,
    shutdown_with_message: true,
    wait_ready: false,
    // Advanced restart options
    exp_backoff_restart_delay: 100,
    vizion: false,
    post_update: ['yarn install', 'yarn build']
  }]
};
