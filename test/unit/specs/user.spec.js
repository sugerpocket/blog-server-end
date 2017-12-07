const supertest = require('supertest');
const expect = require('chai').expect;

function login(request) {
  const api = '/api/user/login';

  describe(`test ${api}`, function() {
    it('密码错误', async () => {
      const data = {
        username: 'sugerpocket',
        password: 'dtl19970126',
      };
      const res = await request.post(api).send(data);
      expect(res.status).to.equal(400);
      expect(res.body.data).to.equal(null);
    });

    it('用户登陆', async () => {
      const data = {
        username: 'sugerpocket',
        password: 'dtlzdxyw0126.',
      };
      const res = await request.post(api).send(data);
      expect(res.status).to.equal(200);
    });
  });
}

function register(request) {
  const api = '/register';
  describe(`test ${api}`, function() {
    it('没有这个接口', async () => {
      const res = await request.post(api);
      expect(res.status).to.equal(404);
    });
  });
}

module.exports = async (request) => {
  await login(request);
  await register(request);
};