const user = require('../controllers/user.ctrl');
const { exists, isDuplicated, validator } = require('../middlewares/users');

const router = require('koa-router')({
  prefix: '/user'
});

router
  .all('/:userId', exists)
  .get('/:userId/tags', user.getAllTags)
  .get('/:userId/avatar', user.getAvatar)
  .get('/:userId/articles', user.getAllArticles)
  .post('/login', validator, user.login)
  .post('/avatar', user.updateAvatar)
  .post('/register', validator, isDuplicated, user.register);

module.exports = (app) => {
  app.use(router.routes());
};
