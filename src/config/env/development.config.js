module.exports = 
{
  "name": "sugerpocket.dev",
  "max_memory_restart": "512M",
  "log_date_format": "YYYY-MM-DD HH:mm:ss SSS",
  "script": "./server/app.js",
  "out_file": "./logs/app.log",
  "error_file": "./logs/err.log",
  "port": "3002",
  "env": {
    "NODE_ENV": 'development',
    "DB_USER": "root",
    "DB_PASSWORD": "dtl19970126",
    "DB_HOST": "127.0.0.1",
    "DB_PORT": "3306",
    "DB_NAME": "sugerpocket_test"
  }
};