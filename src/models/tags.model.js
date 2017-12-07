const { query }  = require('../services/db.service');
const table = 'tags';

/**
 * 创建一个 tag
 * @param {string} tagname 
 * @param {Connection} connection 
 */
function createOne(tagname, user_id, connection) {
  const sql = 
    `insert into ${table} ` +
    `(tag_name, user_id) ` + 
    `values (?,?)`;
  const values = [tagname, user_id];
  return query(sql, values, connection);
}

/**
 * 获取所有 tags
 * @param {number} user_id
 * @param {Connection} connection 
 * @return {Promise<object>}
 */
function retrieveAllByUserId(user_id, connection) {
  const sql = 
    `select tag_name from ${table} where user_id = ?`;
  const values = [user_id];
  return query(sql, values, connection);
}

/**
 * 获取单个 tag
 * @param {number} user_id 
 * @param {string} tag_name 
 * @param {Connection} connection 
 */
function retrieveOne(user_id, tag_name, connection) {
  const sql =
    `select * from ${table} where user_id = ? and tag_name = ?`;
  const values = [user_id, tag_name];
  return query(sql, values, connection);
}

/**
 * 根据 id 删除 tag
 * @param {number} user_id
 * @param {string} tag_name 
 * @param {Connection} connection 
 */
function deleteOne(user_id, tag_name, connection) {
  const sql =
    `delete from ${table} ` +
    `where tag_id = ? and tag_name = ?`;
  const values = [tag_id, tag_name];
  return query(sql, values, connection);
}

module.exports = {
  retrieveAllByUserId,
  createOne,
  deleteOne,
  retrieveOne,
};