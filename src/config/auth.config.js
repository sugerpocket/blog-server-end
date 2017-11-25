const res = require('../utils/response');

const authWhiteList = [
  '/api/user/login'
];

async function requireAuthentication(ctx, next) {
  // if (!ctx.session.userMeta && !authWhiteList.includes(ctx.originalUrl))
  //   ctx.body = ResBody.create(ctx, 'NO_AUTHENTICATION', null, '您还没登陆呢');
  // else
  return next();
}

async function loadUser(ctx, next) {
  ctx.state.userMeta = req.session.userMeta;
  return next();
}

module.exports = {
  requireAuthentication,
  loadUser,
};