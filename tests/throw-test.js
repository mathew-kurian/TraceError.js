var TraceError = require('../');
var assert = require('assert');

describe('TraceError', function () {
  it('should chain multiple errors across different levels', function () {
    try {
      try {
        throw new TraceError('Test error', Error('Test cause'), {error: 'test'});
      } catch (e) {
        throw new TraceError('Captured', {test: 5}, e);
      }
    } catch (e) {
      assert.equal(e.message, 'Captured');
      assert.equal(e.cause().test, 5);
      assert.equal(e.causes()[1].message, 'Test error');
      assert.equal(e.causes()[1].cause().message, 'Test cause');
      assert.equal(e.causes()[1].causes()[1].error, 'test');
    }
  });
});