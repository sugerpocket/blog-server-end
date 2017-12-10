const article = require('../controllers/article.ctrl');
const { exists, isAuthor, validator, isDuplicated } = require('../middlewares/articles');
const { checkTags } = require('../middlewares/tags');
const requireAuthentication = require('../middlewares/auth');

const router = require('koa-router')({
  prefix: '/article'
});

router
  .all('/:articleId', exists)
  .get('/', article.retrieveAll)
  .post('/', requireAuthentication, validator, isDuplicated, checkTags, article.createOne)
  .get('/:articleId', article.retrieveOneDetail)
  .put('/:articleId', requireAuthentication, validator, isAuthor, isDuplicated, checkTags, article.updateOne)
  .delete('/:articleId', requireAuthentication, isAuthor, article.deleteOne);

module.exports = (app) => {
  app.use(router.routes());
};