const md5 = require('md5');
const users = require('../models/users.model');
const articles = require('../models/articles.model');
const tags = require('../models/tags.model');
const res = require('../utils/response');
const file = require('../services/file.service');
const Context = require('koa/lib/context');

/**
 * 登陆接口
 * @param {Context} ctx 
 * @param {() => Promise<void>} next 
 */
async function login(ctx, next) {
  let { username, password } = ctx.request.body;

  password = md5(password);
  const result = await users.retrieveOneByName(username);
  if (!result.length)
    throw res.error(ctx, null, '用户不存在');
  else if (result[0].password !== password)
    throw res.error(ctx, null, '密码错误');
  else {
    delete result[0].password;
    ctx.session.userMeta = result[0];
    ctx.body = res.create(ctx, result[0], '登陆成功');
  }
}

async function register(ctx, next) {
  const user = ctx.request.body;
  const result = await users.createOne(user);

  ctx.body = res.create(ctx, result, '注册成功');
}

async function getAvatar(ctx, next) {
  const uid = ctx.params.userId;
  try {
    ctx.body = await file.get(`avatars/${uid}`);
  } catch(e) {
    throw res.error(ctx, e, '找不到用户头像', 404);
  }
}

async function update(ctx, next) {
  const meta = ctx.request.body;
  await user.updateOne(uid, meta);
  delete meta.password;
  throw res.create(ctx, meta, '更新成功');
}

async function updateAvatar(ctx, next) {
  const { uid } = ctx.session.userMeta;
  if (ctx.avatar) {
    await file.upload(`avatars/${uid}`);
  }
}

async function getAllArticles(ctx, next) {
  const uid = ctx.params.userId;

  const result = await articles.retrieveAllByUserId(uid);

  ctx.body = res.create(ctx, result, '获取用户所有文章成功');
}

async function getAllTags(ctx, next) {
  const uid = ctx.params.userId;

  const result = await tags.retrieveAllByUserId(uid);

  ctx.body = res.create(ctx, result, '获取用户所有标签成功');
}

module.exports = {
  login,
  register,
  getAvatar,
  updateAvatar,
  update,
  getAllArticles,
  getAllTags,
};