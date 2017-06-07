const user = require('../models/users.model');
const ResBody = require('../utils/ResBody');

async function login(ctx, next) {
  ctx.body = ResBody.create(ctx, 'OK', { ok: true }, '');
}

async function register(ctx, next) {

  let result = [];
  try {
    result.push(await user.retrieveAll());
    result.push(await user.retrieveOneById(1));
    result.push(await user.retrieveOneByName('sugerpocket'));
  }
  catch (e) {
    ctx.body = ResBody.fromError(ctx, 'DB_QUERY_ERR', e, '数据库查询错误');
    return next();
  }

  ctx.body = ResBody.create(ctx, 'OK', result, 'OK');

}

async function getAvatar(ctx, next) {

}

async function update(ctx, next) {
  
}

module.exports = {
  login,
  register,
  getAvatar,
  updatePassword,
  update,
};