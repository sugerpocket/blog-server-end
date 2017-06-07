const config = require(`../config`);
const mysql = require('mysql');
const { promisifyAll } = require('bluebird');
const co = require('co');

promisifyAll(require('mysql/lib/Connection').prototype);
promisifyAll(require('mysql/lib/Pool').prototype);

const pool = mysql.createPool({
  host: config.env.DB_HOST,
  user: config.env.DB_USER,
  password: config.env.DB_PASSWORD,
  database: config.env.DB_NAME,
  connectionLimit: 3
});

/**
 * 申请连接
 * @return {Connection} 连接
 */
function getConnection() {
  return pool.getConnectionAsync();
}

/**
 * 查询数据库
 * @param {String} sql 查询语句
 * @param {Array} values 模板替换值
 * @param {Connection} connection
 * @return {Promise<any>}
 */
function query(sql, values, connection) {
  if (!connection) connection = pool;
  return connection.queryAsync(sql, values);
}

exports = module.exports = {
  getConnection,   
  query,
  pool,
};
