const { query }  = require('../services/db.service');
const table = 'comments';

function retrieveAllByArticle(article_id, connection) {
  const sql =
    `select * from ${table} ` +
    `where article_id = ?`;
  const values = [article_id];
  return query(sql, values, connection);
}

function createOne(article_id, content, connection) {
  const sql =
    `insert into ${table} ` +
    `(article_id, content) ` +
    `values (?,?)`;
  const values = [article_id, content];
  return query(sql, values, connection);
}

function updateOne(article_id, content, connection) {
  const update_time = new date();
  const sql =
    `update ${table} ` +
    `set content = ?, update_time = ? ` +
    `where article_id = ?`;
  const values = [content, update_time, article_id];
  return query(sql, values, connection);
}

function deleteOne(article_id, connection) {
  const sql =
    `delete from ${table} ` +
    `where article_id = ?`;
  const values = [article_id];
  return query(sql, values, connection);
}

module.exports = {
  createOne,
  updateOne,
  retrieveAllByArticle,
};