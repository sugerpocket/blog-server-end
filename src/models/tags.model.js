const { query }  = require('../services/db.service');
const table = 'tags';

/**
 * 创建一个 tag
 * @param {String} tagname 
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

function retrieveAll(connection) {
  const sql = 
    `select * from ${table} `;
  const values = [];
  return query(sql, values, connection);
}

function retrieveOneById(tag_id, connection) {
  const sql =
    `select * from ${table} ` +
    `where tag_id = ?`;
  const values = [tag_id];
  return query(sql, values, connection);
}