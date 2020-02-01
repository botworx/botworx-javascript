/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const grammar = require('./grammar');

class MiaParser extends grammar.Parser {
  constructor(lexer, yy) {
    super();
    this.lexer = lexer;
    this.yy = yy;
  }
  parse(code, options) {
    return super.parse(code);
  }
  parseError(str, hash) {
    console.log(str);
    console.log(hash);
    throw new Error('Parse Error');
  }
}

exports.MiaParser = MiaParser;
