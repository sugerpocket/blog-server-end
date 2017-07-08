const supertest = require('supertest');
const expect = require('chai').expect;

async function login(request) {
  await
    request
      .post('/api/user/login')
      .send({
        username: 'sugerpocket',
        password: 'dtlzdxyw0126.'
      })
      .expect(304)
      .then(res => {
        expect(res.body.status).to.equal('OK');
        expect(res.body.data).to.be.a('object');
      });

  // await new Promise((resolve, reject) => {
  //   it ('should be "wrong password"', done => {
  //     const data = {
  //       username: 'sugerpocket',
  //       password: 'dtl19970126'
  //     };

  //     request
  //       .post('/api/user/login')
  //       .send(data)
  //       .expect(200)
  //       .end((err, res) => {
  //         expect(res.body.status).to.equal('BAD_DATA');
  //         expect(res.body.data).to.equal(null);
  //         resolve();
  //         done();
  //       });
  //   });
  // });
}

function register(request) {
  return new Promise((resolve, reject) => {
    request
      .post('/register')
  });
}

module.exports = async (request) => {
  await new Promise((resolve, reject) => {
    describe('test user api', async done => {
      await login(request);
      resolve();
    });
  });
};