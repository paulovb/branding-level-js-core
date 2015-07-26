var request = require('supertest');

describe('BrandController', function() {

  describe('#index()', function() {
    it('should redirect to /brand', function (done) {
      request(sails.hooks.http.app)
        .get('/brand')
        .expect(200, done);
    });
  });

});
