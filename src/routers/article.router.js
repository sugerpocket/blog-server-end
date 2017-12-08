const article = require('../controllers/article.ctrl');
const { exists, isAuthor, validator, isDuplicated } = require('../middlewares/articles');
const { checkTags } = require('../middlewares/tags');

const router = require('koa-router')({
  prefix: '/article'
});

router
  .all('/:articleId', exists)
  .get('/', article.retrieveAll)
  .post('/', validator, isDuplicated, checkTags, article.createOne)
  .get('/:articleId', article.retrieveOneDetail)
  .put('/:articleId', validator, isAuthor, isDuplicated, checkTags, article.updateOne)
  .delete('/:articleId', isAuthor, article.deleteOne);

module.exports = (app) => {
  app.use(router.routes());
};