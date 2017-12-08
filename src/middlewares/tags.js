const Context = require('koa2/lib/context');
const validate = require('./validate');
const tags = require('../models/tags.model');
const res = require('../utils/response');

/**
 * 判断是否存在可操作的 tag
 * @param {Context} ctx 
 * @param {function} next 
 */
async function exists(ctx, next) {
  const { tagName } = ctx.params;
  const uid = ctx.session.userMeta.user_id;

  const result = await tags.retrieveOne(uid, tagName);
  if (!result[0]) throw res.error(ctx, null, '不存在的 tag', 404);

  return next();
}

/**
 * 检查 body 中 tags 存不存在
 * @param {Context} ctx 
 * @param {function} next 
 */
async function checkTags(ctx, next) {
  const tagArr = ctx.request.body.tags;
  const uid = ctx.session.userMeta.user_id;

  await Promise.all(tagArr.map(async name => {
    const result = await tags.retrieveOne(uid, name);
    if (!result[0]) throw res.error(ctx, null, '不存在的 tag', 404);
  }));

  return next();
}

/**
 * 判断 tag 是否重复
 * @param {Context} ctx 
 * @param {function} next 
 */
async function isDuplicated(ctx, next) {
  const { tagName } = ctx.request.body;
  const uid = ctx.session.userMeta.user_id;

  const result = await tags.retrieveOne(uid, tagName);
  if (result[0]) throw res.error(ctx, null, '已存在的 tag');

  return next();
}

const validator = validate('body', {
  required: ['tagName'],
  properties: {
    tagName: {
      type: 'string',
      minLength: 1,
      maxLength: 12
    }
  }
});

module.exports = {
  exists,
  validator,
  checkTags,
  isDuplicated,
};
