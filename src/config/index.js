process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require(`./env/${process.env.NODE_ENV}.config`);

module.exports = config;