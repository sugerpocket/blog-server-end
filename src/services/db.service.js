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

/**
 * 为传入的函数封装事务
 * 传入的 func 原型为 (conn) => Boolean 或 async function (conn) => Boolean，抛出异常则被回滚
 *
 * @param  {function}      func        参数为数据库连接 conn
 */
async function transaction(func) {
  let conn = null;
  try {
    conn = await getConnection();  // 获取连接
    await conn.beginTransactionAsync();  // 开始事务
    try {
      await func(conn);
    } catch (e) {
      e.isFuncError = true;
      throw e;
    }
    await conn.commitAsync();  // 提交事务
  } catch (e) {
    if (conn) await conn.rollbackAsync();  // 回滚事务
    // 继续抛 func 抛出的异常
    if (e.isFuncError) {
      delete e.isFuncError;
      throw e;
    }
    throw Error('数据库事务出错');
    // throw new ME.HardError(ME.INTERNAL_ERROR, '数据库事务出错', 500, e);
  } finally {
    if (conn) conn.release();   // 释放连接
  }
}



exports = module.exports = {
  getConnection, 
  transaction,  
  query,
  pool,
};
