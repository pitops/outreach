module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'API',
      script: 'npm',
      args: 'start',
      watch: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      env: {
        PORT: 8080,
        NODE_ENV: 'development',
        DEBUG: "outreach:*"
      }
    },
    {
      name: 'client',
      cwd: './client',
      script: 'npm',
      args: 'start',
      log_date_format: 'YYYY-MM-DD HH:mm Z'
    }
  ]
}
