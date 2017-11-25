const { query }  = require('../services/db.service');
const table = 'users';

/**
 * 创建一个用户
 * @param {object} user 
 * @param {Connection} connection 
 */
function createOne(user, connection) {
  const join_time = new Date();
  const sql = 
    `insert into ${table} ` +
    `set ?`;
  const values = [user];
  return query(sql, values, connection);
}

/**
 * 根据用户名获取用户信息
 * @param {string} username 
 * @param {Connection} connection 
 * @return {Promise<object>}
 */
function retrieveOneByName(username, connection) {
  const sql = 
    `select * from ${table} ` +
    `where username = ?`;
  const values = [username];
  return query(sql, values, connection);
}

/**
 * 根据用户 id 获取用户信息
 * @param {string} uid 
 * @param {Connection} connection 
 * @return {Promise<object>}
 */
function retrieveOneById(uid, connection) {
  const sql =
    `select * from ${table} ` +
    `where user_id = ?`;
  const values = [uid];
  return query(sql, values, connection);
}

/**
 * 获取所有用户
 * @param {Connection} connection 
 * @return {Promise<Array>}
 */
function retrieveAll(connection) {
  const sql =
    `select * from ${table}`;
  const values = [];
  return query(sql, values, connection);
}

/**
 * 更新用户信息
 * @param {string} uid 
 * @param {object} meta 
 * @param {Connection} connection 
 * @return {Promise<Boolean>}
 */
function updateOne(uid, meta, connection) {
  const sql =
    `update ${table} ` +
    `set ? ` +
    `where user_id = ?`;
  const values = [meta, uid];
  return query(sql, values, connection);
}

module.exports = {
  createOne,
  retrieveAll,
  retrieveOneById,
  retrieveOneByName,
  updateOne,
};