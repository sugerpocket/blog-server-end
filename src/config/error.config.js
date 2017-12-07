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
    console.log(e);
    if (e instanceof res.ErrorResponse) {
      ctx.body = e;
    } else {
      ctx.body = res.error(ctx, e, '未知错误', 500);
    }
  }
}

module.exports = errorHandler;