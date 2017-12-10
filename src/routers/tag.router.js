const tag = require('../controllers/tag.ctrl');
const { exists, isDuplicated, validator } = require('../middlewares/tags');
const requireAuthentication = require('../middlewares/auth');

const router = require('koa-router')({
  prefix: '/tag'
});

router
  .all('/', requireAuthentication)
  .post('/', validator, isDuplicated, tag.createOne)
  .delete('/:tagName', exists, tag.deleteOne);
  // TODO：验证 body 中的 tags 存不存在

module.exports = (app) => {
  app.use(router.routes());
};