const { query }  = require('../services/db.service');
const table = 'article_tags';
const tags = 'tags';
const articles = 'articles';


/**
 * 创建对应的 article tags 记录
 * @param {number} article_id 
 * @param {Array<Number>} tag_ids 
 * @param {Connection} connection
 * @return {Promise<Boolean>}
 */
function createTagRecords(article_id, tag_ids, connection) {
  const sql = tag_ids.map(tag_id => { 
    `insert into ${table} ` +
    `(article_id, tag_id) ` +
    `values (${article_id},${tag_id});`;
  }).reduce((pre, cur) => pre + cur);
  const values = [];
  return query(sql, values, connection);
}

/**
 * 根据 article 获取 tags
 * @param {number} article_id 
 * @param {Connection} connection
 * @return {Array<String>}
 */
function retrieveAllByArticle(article_id, connection) {
  const sql =
    `select t.tag_name ` +
    `from ${table} a inner join ${tags} t ` +
    `where a.article_id = ?`;
  const values = [article_id];
  return query(sql, values, connection);
}

/**
 * 删除所有关联 article 的 tags
 * @param {number} article_id 
 * @param {Connection} connection
 * @return {Promise<Boolean>}
 */
function deleteAllByArticle(article_id, connection) {
  const sql =
    `delete ` +
    `from ${table} ` +
    `where a.article_id = ?`;
  const values = [article_id];
  return query(sql, values, connection)
}

module.exports = {
  createTagRecords,
  retrieveAllByArticle,
  deleteAllByArticle
};