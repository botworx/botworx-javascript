/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const stream = require('stream');

class Stringer extends stream.Writable {
  constructor() {
    super();
    this.chunks = [];
  }
  toString() {
    return this.chunks.join('');
  }
  _write(chunk, encoding, done) {
    this.chunks.push(chunk);
    return done();
  }
}

exports.Stringer = Stringer;
