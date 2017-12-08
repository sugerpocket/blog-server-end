const articles = require('../models/articles.model');
const article_tags = require('../models/article_tags.model');
const users = require('../models/users.model');
const res = require('../utils/response');
const Context = require('koa/lib/context');
const { transaction } = require('../services/db.service');

/**
 * 获取所有文章
 * @param {Context} ctx
 * @param {function} next 
 */
async function retrieveAll(ctx, next) {
  let result = null;
  result = await articles.retrieveAll();
  result = await Promise.all(result.map(async article => {
    const tags = await article_tags.retrieveAllByArticle(article.article_id);
    article.tags = tags;
    return article;
  }));

  ctx.body = res.create(ctx, result, '获取所有文章成功');
}

/**
 * 获取单个文章的详细信息
 * @param {Context} ctx 
 * @param {function} next 
 */
async function retrieveOneDetail(ctx, next) {
  let { articleId } = ctx.params;

  const article = ctx.state.article;
  let result = await users.retrieveOneById(article.author_id);
  const author = result[0];
  article.tags = await article_tags.retrieveAllByArticle(articleId);
  article.author = author;

  ctx.body = res.create(ctx, article, '获取文章成功');
}

/**
 * 创建单个文章
 * @param {Context} ctx 
 * @param {function} next 
 */
async function createOne(ctx, next) {
  const { title, content, description, tags } = ctx.request.body;
  const author = ctx.session.userMeta;

  let article = null;

  await transaction(async conn => {
    await articles.createOne(title, description, content, author.user_id);
    let result = await articles.retrieveByTitle(title);
    article = result[0];
    await article_tags.createTagRecords(article.article_id, author.user_id, tags, conn);

    article.tags = tags;
    article.author = author;
  });

  ctx.body = res.create(ctx, article, '创建成功');
}

/**
 * 根据 id 修改文章内容(暂时不支持修改 tags)
 * @param {Context} ctx 
 * @param {function} next 
 */
async function updateOne(ctx, next) {
  const { title, content, description, tags } = ctx.request.body;
  const { articleId } = ctx.params;
  const authorId = ctx.session.userMeta.user_id;

  let article = null;
  let author = null;

  // 开始事务
  await transaction(async conn => {
    result = await articles.updateOne(articleId, { title, description, content }, conn);
    
    result = await article_tags.deleteAllByArticle(articleId, conn);
    result = await article_tags.createTagRecords(articleId, authorId, tags, conn);
  
    result = await articles.retrieveById(articleId, conn);
    article = result[0];
    result = await users.retrieveOneById(result[0].author_id, conn);
    author = result[0];
    article.tags = await article_tags.retrieveAllByArticle(articleId, conn);
    article.author = author;
    delete author.password;
  });

  ctx.body = res.create(ctx, article, '修改成功');
}

/**
 * 根据 id 删除某一篇文章
 * @param {Context} ctx 
 * @param {function} next 
 */
async function deleteOne(ctx, next) {
  let { articleId } = ctx.params;

  const result = await articles.removeOne(articleId);

  ctx.body = res.create(ctx, result, '删除成功');
}

module.exports = {
  retrieveAll,
  retrieveOneDetail,
  updateOne,
  createOne,
  deleteOne,
};