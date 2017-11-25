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
 * @param {string} status
 * @param {string} stack
 * @param {string} msg
 */
function error(ctx, status, err, msg) {
  const stack = err ? err.stack : null;
  const end = new Date();
  const { start, userMeta } = ctx.state;
  return new ErrorResponse({
    start,
    status,
    end,
    stack,
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
 * @param {String} status
 * @param {Object} data 
 * @param {String} msg
 *
 */
function create(ctx, status, data, msg) {
  const end = new Date();
  const { start, userMeta } = ctx.state;
  return new Response({
    start,
    status,
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
