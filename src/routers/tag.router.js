const tag = require('../controllers/tag.ctrl');
const ResBody = require('../utils/ResBody');

const router = require('koa-router')({
  prefix: '/article'
});

router
  .get('/all', tag.retrieveAll)
  .get('/:tag_id', tag.retrieveOne)
  .post('/create', tag.createOne);

module.exports = (app) => {
  app.use(router.routes());
}