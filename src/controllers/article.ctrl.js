const articles = require('../models/articles.model');
const article_tags = require('../models/article_tags.model');
const users = require('../models/users.model');
const res = require('../utils/response');
const Context = require('koa/lib/context');

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

async function retrieveOneDetail(ctx, next) {
  let { articleId } = ctx.params;

  const article = ctx.state.article;
  let result = await users.retrieveOneById(article.author_id);
  const author = result[0];
  article.tags = await article_tags.retrieveAllByArticle(articleId);
  article.author = author;

  ctx.body = res.create(ctx, article, '获取文章成功');
}

async function createOne(ctx, next) {
  let { title, content, description, tags } = ctx.request.body;
  let author_id = ctx.session.userMeta.user_id;
  let result = await articles.retrieveByTitle(title);
  if (result.length) {
    throw res.error(ctx, null, '存在相同标题的文章');
  }
  await articles.createOne(title, description, content, author_id);
  result = await articles.retrieveByTitle(title);

  ctx.body = res.create(ctx, result[0], '创建成功');
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

  // TODO: 数据同步
  result = await articles.updateOne(articleId, { title, description, content });

  if (Array.isArray(tags)) {
    result = await article_tags.deleteAllByArticle(articleId);
    result = await article_tags.createTagRecords(articleId, authorId, tags);
  }

  result = await articles.retrieveById(articleId);
  const article = result[0];
  result = await users.retrieveOneById(result[0].author_id);
  const author = result[0];
  article.tags = await article_tags.retrieveAllByArticle(articleId);
  article.author = author;
  delete author.password;

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