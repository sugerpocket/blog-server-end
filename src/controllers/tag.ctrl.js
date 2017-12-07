const tags = require('../models/tags.model');
const res = require('../utils/response');

async function createOne(ctx, next) {
  const name = ctx.request.body.tagName;
  const uid = ctx.session.userMeta.user_id;
  const result = await tags.createOne(name, uid);

  ctx.body = res.create(ctx, result, '创建 tag 成功');
}

async function retrieveAll(ctx, next) {
  const uid = ctx.session.userMeta.user_id;
  const result = await tags.retrieveAllByUserId(uid);

  ctx.body = res.create(ctx, result, '获取所有 tag 成功');
}

async function retrieveOne(ctx, next) {
  const { tagName } = ctx.params;
  const uid = ctx.session.userMeta.user_id;
  const result = await tags.retrieveOne(uid, tagName);

  ctx.body = res.create(ctx, result, '获取 tag 成功');
}

async function deleteOne(ctx, next) {
  const { tagName } = ctx.params;
  const uid = ctx.session.userMeta.user_id;
  const result = await tags.deleteOne(uid, tagId);

  ctx.body = res.create(ctx, result, '删除 tag 成功');
}

module.exports = {
  createOne,
  retrieveOne,
  retrieveAll,
  deleteOne,
};
