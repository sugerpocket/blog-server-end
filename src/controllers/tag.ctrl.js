const tag = require('../models/tags.model');
const res = require('../utils/response');

async function createOne(ctx, next) {
  let { name } = ctx.request.body;
  let result = null;

  result = tag.createOne(name);

  ctx.body = res.create(ctx, 'OK', result, '获取所有 tag 成功');
}

async function retrieveAll(ctx, next) {
  let result = null;

  result = tag.retrieveAll(tag_id);

  ctx.body = res.create(ctx, 'OK', result, '获取所有 tag 成功');
}

async function retrieveOne(ctx, next) {
  let { tag_id } = ctx.request.param;
  let result = null;

  result = tag.retrieveOneById(tag_id);

  ctx.body = res.create(ctx, 'OK', result, '获取 tag 成功');
}

module.exports = {
  createOne,
  retrieveOne,
  retrieveAll,
};
