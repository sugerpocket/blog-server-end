const article = require('../models/articles.model');
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
  let { article_id } = ctx.request.query;
  let result = null;

  if (typeof article_id != 'string') {
    ctx.body = ResBody.fromError(ctx, 'BAD_DATA', e, '不存在的文章');
    return next();
  }
  try {
    result = await article.retrieveById(article_id);
  }
  catch(e) {
    ctx.body = ResBody.fromError(ctx, 'DB_QUERY_ERR', e, '数据库查询错误');
    return next();
  }

  ctx.body = ResBody.create(ctx, 'OK', result, '获取文章成功');
  return next();
}

async function createOne(ctx, next) {
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

  ctx.body = ResBody.create(ctx, 'OK', result, '创建');
  return next();
}

async function updateOneDetail() {
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

  ctx.body = ResBody.create(ctx, 'OK', result, '创建');
  return next();
}

async function deleteOne() {
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

  ctx.body = ResBody.create(ctx, 'OK', result, '创建');
  return next();
}

module.exports = {
  retrieveAll,
  retrieveOneDetail,
  createOne,
};