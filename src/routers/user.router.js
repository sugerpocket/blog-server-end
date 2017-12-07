const user = require('../controllers/user.ctrl');
const { isDuplicated, validator } = require('../middlewares/users');

const router = require('koa-router')({
  prefix: '/user'
});

router
  .post('/login', validator, user.login)
  .post('/register', validator, isDuplicated, user.register);

module.exports = (app) => {
  app.use(router.routes());
};
