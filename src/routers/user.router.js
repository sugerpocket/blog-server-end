const user = require('../controllers/user.ctrl');
const ResBody = require('../utils/ResBody');

const router = require('koa-router')({
  prefix: '/user'
});

function toInt(param, next) {
  console.log(param);
  next();
}

router
  .param('param', toInt)
  .get('/login', user.login)
  .get('/register', user.register);

module.exports = (app) => {
  app.use(router.routes());
}
