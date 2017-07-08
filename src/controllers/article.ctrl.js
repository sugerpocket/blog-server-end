const article = require('../models/articles.model');
const article_tags = require('../models/article_tags.model');
const ResBody = require('../utils/ResBody');

async function retrieveAll(ctx, next) {
  let result = null;
  try {
    result = await article.retrieveAll();
  }
  catch(e) {
    ctx.body = ResBody.fromError(ctx, 'DB_QUERY_ERR', e, '数据库查询错误');
    return next();
  }

  ctx.body = ResBody.create(ctx, 'OK', result, '获取所有文章成功');
  return next();
}

async function retrieveOneDetail(ctx, next) {
  let { article_id } = ctx.request.param;
  let result = null;

  if (typeof article_id != 'string') {
    ctx.body = ResBody.fromError(ctx, 'BAD_DATA', e, '不存在的文章');
    return next();
  }
  try {
    result = await article.retrieveById(article_id);
    if (typeof result != 'object') {
      ctx.body = ResBody.create(ctx, 'BAD_DATA', null, '文章不存在');
      return next();
    }
    result.tags = await article_tags.retrieveAllByArticle(article_id);
  }
  catch(e) {
    ctx.body = ResBody.fromError(ctx, 'DB_QUERY_ERR', e, '数据库查询错误');
    return next();
  }

  ctx.body = ResBody.create(ctx, 'OK', result, '获取文章成功');
  return next();
}

async function createOne(ctx, next) {
  let { title, content, description, tags } = ctx.request.body;
  let author_id = ctx.session.userMeta.uid;
  let result = null;
  try {
    result = await article.updateOne(article_id, { title, description, content });
  }
  catch(e) {
    ctx.body = ResBody.fromError(ctx, 'DB_QUERY_ERR', e, '数据库查询错误');
    return next();
  }

  ctx.body = ResBody.create(ctx, 'OK', result, '创建成功');
  return next();
}

/**
 * 根据 id 修改文章内容(暂时不支持修改 tags)
 * @param {Context} ctx 
 * @param {function} next 
 */
async function updateOneDetail(ctx, next) {
  let { title, content, description } = ctx.request.body;
  let { author_id } = ctx.session.userMeta;
  let result = null;

  try {
    result = await article.createOne(title, description, content, author_id);
  }
  catch(e) {
    ctx.body = ResBody.fromError(ctx, 'DB_QUERY_ERR', e, '数据库查询错误');
    return next();
  }

  ctx.body = ResBody.create(ctx, 'OK', result, '修改成功');
  return next();
}

/**
 * 根据 id 删除某一篇文章
 * @param {Context} ctx 
 * @param {function} next 
 */
async function deleteOne(ctx, next) {
  let { article_id } = ctx.request.param;
  let result = null;
  try {
    result = await article.removeOne(article_id);
  }
  catch(e) {
    ctx.body = ResBody.fromError(ctx, 'DB_QUERY_ERR', e, '数据库查询错误');
    return next();
  }

  ctx.body = ResBody.create(ctx, 'OK', result, '创建');
  return next();
}

module.exports = {
  retrieveAll,
  retrieveOneDetail,
  createOne,
};