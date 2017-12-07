const Context = require('koa2/lib/context');
const res = require('../utils/response');
var Ajv = require('ajv');

/**
 * 生成验证请求的中间件
 * @param {string} field 必须存在的属性
 * @param {object} schema ajv 验证格式 
 */
function validate(field, schema) {
  var ajv = new Ajv({allErrors: true});
  const validate = ajv.compile(schema);
  return async(ctx, next) => {
    if (!ctx[field] && !ctx.request[field]) throw res.error(ctx, ajv.errors, '不合法的数据');
    const valid = validate(ctx[field] || ctx.request[field]);
    if (!valid) throw res.error(ctx, validate.errors, '不合法的数据');
    return next();
  };
}

module.exports = validate;
