const app = require('../../src/app');
const request = require('supertest-as-promised')(app);

const testModules = [
  'user',
  'tag',
  'article'
];

async function test() {
  for (let module of testModules) {
    const test = require('./specs/' + module + '.spec');
    await test(request);
  }
  return true;
}

test()
  .then(val => {
    console.log('test end!');
  })
  .catch(e => {
    console.log('test failed!\n', e);
  });
