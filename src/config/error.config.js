const res = require('../utils/response');
/**
 * 专门处理未捕获的错误
 * @param {Context} ctx koa 上下文
 * @param {function} next
 */
async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (e) {
    if (e instanceof res.ErrorResponse) {
      ctx.body = e;
      ctx.status = 400;
    } else {
      ctx.body = res.error(ctx, 'UNKNOWN_ERROR', e, '未知错误');
      ctx.status = 500;
    }
  }
}

module.exports = errorHandler;