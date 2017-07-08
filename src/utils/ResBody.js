
/**服务器响应类
 *
 * @class ResBody
 * @constructor
 * @param {Object} props
 */
class ResBody {
  /**获取错误响应的函数
   * 
   * @method fromError
   * @for ResBody
   * @param {context} ctx
   * @param {String} status
   * @param {String} stack
   * @param {String} msg
   */
  static
  fromError(ctx, status, err, msg) {
    const stack = err.stack;
    const end = new Date();
    const { start, userMeta } = ctx.state;
    return new ResBody({
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
  static
  create(ctx, status, data, msg) {
    const end = new Date();
    const { start, userMeta } = ctx.state;
    return new ResBody({
      start,
      status,
      end,
      msg,
      data,
      userMeta,
    });
  }

  constructor(props) {
    Object.assign(this, props);
  }
}

module.exports = ResBody;