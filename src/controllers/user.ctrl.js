const md5 = require('md5');
const user = require('../models/users.model');
const res = require('../utils/response');

async function login(ctx, next) {
  let { username, password } = ctx.request.body;
  let result = null;
  password = md5(password);
  result = await user.retrieveOneByName(username);
  if (!result.length)
    throw res.error(ctx, 'BAD_DATA', null, '用户不存在');
  else if (result[0].password !== password)
    throw res.error(ctx, 'BAD_DATA', null, '密码错误');
  else {
    delete result[0].password;
    ctx.session.userMeta = result[0];
    ctx.body = res.create(ctx, 'OK', result[0], '登陆成功');
  }
}

async function register(ctx, next) {

  let result = [];
  result.push(await user.retrieveAll());
  result.push(await user.retrieveOneById(1));
  result.push(await user.retrieveOneByName('sugerpocket'));

  ctx.body = res.create(ctx, 'OK', result, 'OK');

}

async function getAvatar(ctx, next) {

}

async function update(ctx, next) {
  
}

async function updatePassword(ctx, next) {
  
}

module.exports = {
  login,
  register,
  getAvatar,
  updatePassword,
  update,
};