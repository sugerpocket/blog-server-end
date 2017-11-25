const { query }  = require('../services/db.service');
const table = 'tags';

/**
 * 创建一个 tag
 * @param {string} tagname 
 * @param {Connection} connection 
 */
function createOne(tagname, connection) {
  const sql = 
    `insert into ${table} ` +
    `(tag_name) ` + 
    `values (?)`;
  const values = [tagname];
  return query(sql, values, connection);
}

/**
 * 获取所有 tags
 * @param {Connection} connection 
 * @return {Promise<object>}
 */
function retrieveAll(connection) {
  const sql = 
    `select * from ${table} `;
  const values = [];
  return query(sql, values, connection);
}

/**
 * 根据 id 获取某一 tagname
 * @param {number} tag_id tag 的唯一标识
 * @param {Connection} connection 
 */
function retrieveOneById(tag_id, connection) {
  const sql =
    `select * from ${table} ` +
    `where tag_id = ?`;
  const values = [tag_id];
  return query(sql, values, connection);
}

module.exports = {
  retrieveAll,
  retrieveOneById,
  createOne,
};