const { query }  = require('../services/db.service');
const table = 'articles';
const users = 'users';

/**
 * 新建 blog 文章
 * @param {string} title 
 * @param {string} description 
 * @param {string} content 
 * @param {number} author_id 
 * @param {Connection} connection
 * @return {Promise<boolean>}
 */
function createOne(title, description, content, author_id, connection) {
  const sql = 
    `insert into ${table}` +
    `(title, description, content, author_id) ` +
    `values (?,?,?,?)`;
  const values = [title, description, content, author_id];
  return query(sql, values, connection);
}

/**
 * 获取所有 blog 文章的大概信息
 * @param {Connection} connection
 * @return {Promise<object[]>} 
 */
function retrieveAll(connection) {
  const sql =
    `select a.article_id, a.title, a.description, a.update_time, a.create_time, ` +
    `u.user_id as author_id, u.username as author_name, u.nickname as author_nickname ` +
    `from ${table} a, ${users} u ` + 
    `where a.author_id = u.user_id`;
  const values = [];
  return query(sql, values, connection);
}

/**
 * 获取所有 blog 文章的大概信息
 * @param {Connection} connection
 * @return {Promise<object[]>} 
 */
function retrieveAllByUserId(user_id, connection) {
  const sql =
    `select a.article_id, a.title, a.description, a.update_time, a.create_time, ` +
    `u.user_id as author_id, u.username as author_name, u.nickname as author_nickname ` +
    `from ${table} a, ${users} u ` + 
    `where a.author_id = u.user_id and a.author_id = ?`;
  const values = [user_id];
  return query(sql, values, connection);
}

/**
 * 获取一篇 blog 文章的详细内容
 * @param {number} article_id 
 * @param {Connection} connection
 * @return {object}
 */
function retrieveById(article_id, connection) {
  const sql =
    `select * from ${table} ` +
    `where article_id = ?`;
  const values = [article_id];
  return query(sql, values, connection);
}

/**
 * 获取一篇 blog 文章的详细内容
 * @param {string} title 
 * @param {Connection} connection
 * @return {object}
 */
function retrieveByTitle(title, connection) {
  const sql =
    `select * from ${table} ` +
    `where title = ?`;
  const values = [title];
  return query(sql, values, connection);
}

/**
 * 更新一篇 blog 文章
 * @param {number} article_id 
 * @param {object} meta 
 * @param {Connection} connection
 * @return {Promise<boolean>}
 */
function updateOne(article_id, meta, connection) {
  const sql =
    `update ${table} ` +
    `set ? ` +
    `where article_id = ?`;
  const values = [meta, article_id];
  return query(sql, values, connection);
}

/**
 * 删除一篇 blog 文章
 * @param {number} article_id 
 * @param {Connection} connection
 * @return {Promise<object>} 
 */
function removeOne(article_id, connection) {
  const sql =
    `delete from ${table} ` +
    `where article_id = ?`;
  const values = [article_id];
  return query(sql, values, connection);
}

module.exports = {
  createOne,
  retrieveAll,
  retrieveById,
  retrieveByTitle,
  retrieveAllByUserId,
  updateOne,
  removeOne,
};