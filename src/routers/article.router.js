const article = require('../controllers/article.ctrl');
const { exists, isAuthor, validator, isDuplicated } = require('../middlewares/articles');

const router = require('koa-router')({
  prefix: '/article'
});

router
  .all('/:articleId', exists)
  .get('/', article.retrieveAll)
  .post('/', validator, isDuplicated, article.createOne)
  .get('/:articleId', article.retrieveOneDetail)
  .put('/:articleId', validator, isAuthor, article.updateOne)
  .delete('/:articleId', isAuthor, article.deleteOne);

module.exports = (app) => {
  app.use(router.routes());
};