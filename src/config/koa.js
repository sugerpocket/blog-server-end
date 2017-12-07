const Koa = require('koa2');
const bodyParser = require('koa-bodyparser');
const Application = require('koa2/lib/application');
const app = new Koa();
const { requireAuthentication, loadUser } = require('./auth.config');
const routers = require('./router.config');
const errorHandler = require('./error.config');
const configSession = require('./session.config');

require('koa-validate')(app);

app.env = app.env || 'development';

const config = require(`./`);
/**
 * 输出配置启动应用的函数
 * 
 * @param {Application} app 传入 koa app
 * @return {function} 应用启动函数
 */
function configServer(app) {
  configRequestStartRecord(app);
  configMiddlewares(app);
  configErrorHandler(app);
  configSession(app);
  configAuth(app);
  configRouters(app);
  return () => {
    return app.listen(config.port, () => {
      console.log('当前环境为：' +　app.env);
      console.log('监听的端口号是：' + config.port);
    });
  };
}

/**
 * 加上请求的开始时间
 * 
 * @param {Application} app
 * 
 */
function configRequestStartRecord(app) {
  app.use(async(ctx, next) => {
    ctx.state.start = new Date();
    await next();
  });
}

/**
 * 挂载未捕获错误处理
 * 
 * @param {Application} app
 */
function configErrorHandler(app) {
  app.use(errorHandler);
}

/**
 * 挂载认证配置
 * 
 * @param {Application} app
 */
function configAuth(app) {
  app.use(requireAuthentication, loadUser);
}

/**
 * 挂载应用路由
 * 
 * @param {Application} app
 */
function configRouters(app) {
  routers(app);
}

/**
 * 挂载普通中间件
 * 
 * @param {Application} app
 */
function configMiddlewares(app) {
  app.use(bodyParser());
}

module.exports = configServer(app);
