const res = require('../utils/response');
module.exports = async function requireAuthentication(ctx, next) {
  if (!ctx.session.userMeta)
    ctx.body = res.create(ctx, null, '您还没登陆呢', 401);
  else return next();
}