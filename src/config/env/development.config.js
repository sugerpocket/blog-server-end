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
    "DB_USER": "sugerpocket_test",
    "DB_PASSWORD": "test",
    "DB_HOST": "111.230.114.241",
    "DB_PORT": "3306",
    "DB_NAME": "sugerpocket_test",
    "OSS": {
      "BUCKET": "sugerpocket",
      "REGION": "oss-cn-shenzhen",
      "ACCESS_KEY_ID": "LTAIBMGo5pouUgG6",
      "ACCESS_KEY_SECRET": "A5BhaGbP0HjnDeizuF7NC9fa3D5fmi"
    }
  }
};