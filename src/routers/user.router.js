const user = require('../controllers/user.ctrl');

const router = require('koa-router')({
  prefix: '/user'
});

router
  .post('/login', user.login)
  .post('/register', user.register);

module.exports = (app) => {
  app.use(router.routes());
}
