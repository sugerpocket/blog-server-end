const tag = require('../models/tags.model');
const ResBody = require('../utils/ResBody');

async function createOne(ctx, next) {
  let { name } = ctx.request.body;
  let result = null;

  try {
    result = tag.createOne(name);
  } catch(e) {
    ctx.body = ResBody.fromError(ctx, 'DB_QUERY_ERR', e, '数据库查询错误');
    return next();
  }

  ctx.body = ResBody.create(ctx, 'OK', result, '获取所有 tag 成功');
}

async function retrieveAll(ctx, next) {
  let result = null;

  try {
    result = tag.retrieveAll(tag_id);
  } catch(e) {
    ctx.body = ResBody.fromError(ctx, 'DB_QUERY_ERR', e, '数据库查询错误');
    return next();
  }

  ctx.body = ResBody.create(ctx, 'OK', result, '获取所有 tag 成功');
}

async function retrieveOne(ctx, next) {
  let { tag_id } = ctx.request.param;
  let result = null;

  try {
    result = tag.retrieveOneById(tag_id);
  } catch(e) {
    ctx.body = ResBody.fromError(ctx, 'DB_QUERY_ERR', e, '数据库查询错误');
    return next();
  }

  ctx.body = ResBody.create(ctx, 'OK', result, '获取 tag 成功');
}

module.exports = {
  createOne,
  retrieveOne,
  retrieveAll,
};
