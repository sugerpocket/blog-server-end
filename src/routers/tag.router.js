const tag = require('../controllers/tag.ctrl');
const { exists, isDuplicated, validator } = require('../middlewares/tags');

const router = require('koa-router')({
  prefix: '/article'
});

router
  .get('/', tag.retrieveAll)
  .post('/', validator, isDuplicated, tag.createOne)
  .delete('/:tagName', exists, tag.deleteOne);

module.exports = (app) => {
  app.use(router.routes());
};