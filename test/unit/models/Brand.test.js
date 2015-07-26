describe.only('Brand', function () {

  describe('#find()', function () {
    it('should check find function', function (done) {
      Brand.find()
        .then(function (results) {
          // some tests
          done();
        })
        .catch(done);
    });
  });

});
