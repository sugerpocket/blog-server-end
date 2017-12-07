/**服务器响应类
 *
 * @class Response
 * @constructor
 * @param {Object} props
 */
class Response {
  constructor(props) {
    Object.assign(this, props);
  }
}

/**服务器错误响应类
 *
 * @class Error
 * @constructor
 * @param {Object} props
 */
class ErrorResponse extends Error {
  constructor(props) {
    super();
    Object.assign(this, props);
  }
}

/**获取错误响应的函数
 * 
 * @param {context} ctx
 * @param {string} stack
 * @param {string} msg
 */
function error(ctx, err, msg, status) {
  const end = new Date();
  const { start, userMeta } = ctx.state;
  ctx.status = status || 400;
  return new ErrorResponse({
    start,
    end,
    err,
    msg,
    data: null,
    userMeta,
  });
}

/**
 * 获取正常响应的函数
 * 
 * @method create
 * @for ResBody
 * @param {Context} ctx
 * @param {number} status
 * @param {object} data 
 * @param {string} msg
 *
 */
function create(ctx, data, msg, status) {
  const end = new Date();
  const { start, userMeta } = ctx.state;
  ctx.status = status || 200;
  return new Response({
    start,
    end,
    msg,
    data,
    userMeta,
  });
}

module.exports = {
  error,
  create,
  Response,
  ErrorResponse
};
