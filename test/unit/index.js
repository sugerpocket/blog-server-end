const app = require('../../src/app');
const request = require('supertest-as-promised')(app);

const testModules = [
  'user',
  'tag',
  'article'
];

describe('启动测试', function (done) {
  for (let module of testModules) {
    describe(`test ${module} api`, function() {
      return require('./specs/' + module + '.spec')(request);
    });
  }
});
