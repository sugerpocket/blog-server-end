const tags = require('../models/tags.model');
const res = require('../utils/response');

async function createOne(ctx, next) {
  const name = ctx.request.body;
  const result = await tags.createOne(name);

  ctx.body = res.create(ctx, result, '创建 tag 成功');
}

async function retrieveAll(ctx, next) {
  const uid = ctx.session.userMeta.user_id;
  const result = tags.retrieveAllByUserId(user_id);

  ctx.body = res.create(ctx, result, '获取所有 tag 成功');
}

async function retrieveOne(ctx, next) {
  const { tagId } = ctx.params;
  const result = tags.retrieveOneById(tagId);

  ctx.body = res.create(ctx, result, '获取 tag 成功');
}

async function deleteOne(ctx, next) {
  const { tagId } = ctx.params;
  const result = tags.deleteOneById(tagId);

  ctx.body = res.create(ctx, result, '删除 tag 成功');
}

module.exports = {
  createOne,
  retrieveOne,
  retrieveAll,
  deleteOne,
};
