const tags = require('../models/tags.model');
const res = require('../utils/response');

/**
 * 创建一个 tag
 * @param {Context} ctx 
 * @param {function} next 
 */
async function createOne(ctx, next) {
  const name = ctx.request.body.tagName;
  const uid = ctx.session.userMeta.user_id;
  const result = await tags.createOne(name, uid);

  ctx.body = res.create(ctx, result, '创建 tag 成功');
}

/**
 * 获取用户的所有 tag
 * @param {Context} ctx 
 * @param {function} next 
 */
async function retrieveAll(ctx, next) {
  const uid = ctx.session.userMeta.user_id;
  const result = await tags.retrieveAllByUserId(uid);

  ctx.body = res.create(ctx, result, '获取所有 tag 成功');
}

/**
 * 获取单个 tag（感觉没什么意义的接口，只能用来判断 tag 是否存在）
 * @param {Context} ctx 
 * @param {function} next 
 */
async function retrieveOne(ctx, next) {
  const { tagName } = ctx.params;
  const uid = ctx.session.userMeta.user_id;
  const result = await tags.retrieveOne(uid, tagName);

  ctx.body = res.create(ctx, result, '获取 tag 成功');
}

/**
 * 删除一个 tag
 * @param {Context} ctx 
 * @param {function} next 
 */
async function deleteOne(ctx, next) {
  const { tagName } = ctx.params;
  const uid = ctx.session.userMeta.user_id;
  const result = await tags.deleteOne(uid, tagName);

  ctx.body = res.create(ctx, result, '删除 tag 成功');
}

module.exports = {
  createOne,
  retrieveOne,
  retrieveAll,
  deleteOne,
};
