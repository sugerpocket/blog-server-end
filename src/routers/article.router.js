const article = require('../controllers/article.ctrl');
const ResBody = require('../utils/ResBody');

const router = require('koa-router')({
  prefix: '/article'
});

router
  .get('/all', article.retrieveAll)
  .get('/:articleId', article.retrieveOneDetail)
  .post('/create', article.createOne);

module.exports = (app) => {
  app.use(router.routes());
}