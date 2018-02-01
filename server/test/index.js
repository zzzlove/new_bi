import http from 'http';
import assert from 'assert';

import '../src/index.js';

describe('Http server test', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:8080', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
