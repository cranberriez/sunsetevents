var expect = require('chai').expect;
var authorize = require('../controllers/authorize.js');

describe('hash()', function () {
  it('should hash input', function () {
    var input = "9bceef16317112fda9a76aea295c1ba6";
    var output = authorize.hash(input)
    var user = "jacob"
    expect(output).to.be.equal(authorize.getUserInfo(user));
  });
});
