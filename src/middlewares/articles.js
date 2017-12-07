const Context = require('koa2/lib/context');
const articles = require('../models/articles.model');
const validate = require('./validate');
const res = require('../utils/response');

/**
 * 判断是否是存在的文章并将查询到的文章挂载到 state 上面
 * @param {Context} ctx 
 * @param {function} next 
 */
async function exists(ctx, next) {
  const articleId = ctx.params.articleId;

  const result = await articles.retrieveById(articleId);
  if (!result[0]) throw res.error(ctx, null, '文章不存在', 404);

  ctx.state.article = result[0];
  return next();
}

/**
 * 判断 title 是否重复
 * @param {Context} ctx 
 * @param {function} next 
 */
async function isDuplicated(ctx, next) {
  const title = ctx.request.body.title;

  const result = await articles.retrieveByTitle(title);
  if (result[0]) throw res.error(ctx, null, '已存在相同标题的文章');

  return next();
}

/**
 * 判断是不是作者, 必须在 exists 之后调用
 * @param {Context} ctx 
 * @param {function} next 
 */
async function isAuthor(ctx, next) {
  const article = ctx.state.article;
  const uid = ctx.session.userMeta.user_id;
  if (uid !== article.author_id) throw res.error(ctx, null, '您没有权限对该文章进行修改', 403);

  return next();
}


const validator = validate('body', {
  required: ['title', 'content', 'description', 'tags'],
  properties: {
    title: {
      type: 'string',
      maxLength: 30,
      minLength: 8
    },
    content: {
      type: 'string',
      maxLength: 1000,
    },
    description: {
      type: 'string',
      maxLength: 50
    },
    tags: {
      type: 'array',
      items: {
        typr: 'string'
      },
      uniqueItems: true
    }
  }
});

module.exports = {
  exists,
  isAuthor,
  validator,
  isDuplicated,
};
