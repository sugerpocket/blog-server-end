const users = require('../models/users.model');
const Context = require('koa2/lib/context');
const res = require('../utils/response');
const validate = require('./validate');

async function isDuplicated(ctx, next) {
  const { username } = ctx.request.body;

  const result = await users.retrieveOneByName(username);
  if (result.length) throw res.error(ctx, null, '存在相同的用户名');

  return next();
}

const validator = validate('body', {
  required: ['username', 'password'],
  properties: {
    username: {
      type: 'string',
      minLength: 6,
      maxLength: 18,
      pattern: '^(?!_)(?!.*?_$)[a-zA-Z0-9_\\u4e00-\\u9fa5]+$'
    },
    password: {
      type: 'string',
      pattern: '^[a-zA-Z][\\.\\w]{7,17}$'
    },
    nickname: {
      type: 'string',
      minLength: 3,
      maxLength: 12,
      pattern: '^(?!_)(?!.*?_$)[a-zA-Z0-9_\\u4e00-\\u9fa5]+$'
    },
    email: {
      type: 'string',
      format: 'email'
    }
  }
});


module.exports = {
  validator,
  isDuplicated
};
