const { query }  = require('../services/db.service');
const table = 'article_tags';
const tags = 'tags';
const articles = 'articles';


/**
 * 创建对应的 article tags 记录
 * @param {number} article_id 
 * @param {number} user_id
 * @param {Array<string>} tags
 * @param {Connection} connection
 * @return {Promise<Boolean>}
 */
function createTagRecords(article_id, user_id, tags, connection) {
  const sql = tags.map(tag_name => 
    `insert into ${table} ` +
    `(article_id, user_id, tag_name) ` +
    `values (${article_id},${user_id},${tag_name});`
  ).reduce((pre, cur) => pre + cur, '');
  const values = [];
  return query(sql, values, connection);
}

/**
 * 根据 article 获取 tags
 * @param {number} article_id 
 * @param {Connection} connection
 * @return {Array<string>}
 */
function retrieveAllByArticle(article_id, connection) {
  const sql =
    `select t.tag_name ` +
    `from ${table} a, ${tags} t ` +
    `where a.article_id = ?`;
  const values = [article_id];
  return query(sql, values, connection);
}

/**
 * 查找有没有对应记录
 * @param {number} article_id 
 * @param {number} user_id
 * @param {string} tag_name 
 * @param {Connection} connection 
 */
function retrieveOne(article_id, user_id, tag_name, connection) {
  const sql =
    `select a.* from ${table} a ` +
    `where a.tag_id = ? and a.user_id = ? and a.article_id = ?`;
  const values = [tag_id, user_id, article_id];
  return query(sql, values, connection);
}


/**
 * 删除一个tags
 * @param {number} article_id 
 * @param {number} user_id
 * @param {number} tag_name
 * @param {Connection} connection 
 */
function deleteOne(article_id, user_id, tag_name, connection) {
  const sql =
    `delete from ${table} a ` +
    `where a.tag_id = ? and a.user_id = ? and a.article_id = ?`;
  const values = [tag_id, user_id, article_id];
  return query(sql, values, connection);
}

/**
 * 删除所有关联 article 的 tags
 * @param {number} article_id 
 * @param {Connection} connection
 * @return {Promise<boolean>}
 */
function deleteAllByArticle(article_id, connection) {
  const sql =
    `delete ` +
    `from ${table} a ` +
    `where a.article_id = ?`;
  const values = [article_id];
  return query(sql, values, connection)
}

module.exports = {
  createTagRecords,
  retrieveAllByArticle,
  retrieveOne,
  deleteOne,
  deleteAllByArticle
};