var request = require('supertest');

describe('BrandController', function() {

  describe('#index()', function() {
    it('deve retornar o index da page brand', function (done) {
      request(sails.hooks.http.app)
        .get('/brand')
        .expect(200, done);
    });
  });

  describe('#index()', function() {
    it('deve retornar um 404 pois não existe esse registro', function (done) {
      request(sails.hooks.http.app)
        .get('/brand/1')
        .expect(404, done);
    });
  });

});
