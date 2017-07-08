const router = require('koa-router')({
  prefix: '/api'
});

const routes = [
  'user',
  'article',
  'tag'
];

/**
 * 根据名单挂载路由
 * 
 * @param {Application} app
 */
function configRouters(app) {
  for (route of routes) {
    require('../routers/' + route + '.router')(router);
  }
  app.use(router.routes());
}

module.exports = configRouters;

