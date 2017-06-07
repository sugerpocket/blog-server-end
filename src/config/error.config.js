const ResBody = require('../utils/ResBody');
/**
 * 专门处理未捕获的错误
 * @param {Context} [ctx] koa 上下文
 * @param {function} [next]
 */
async function errorHandler(ctx, next) {
  try {
    await next();
  }
  catch (e) {
    ctx.body = ResBody.fromError(ctx, 'UNKNOWN_ERROR', e, '未知错误');
    return;
  }
}

module.exports = errorHandler;