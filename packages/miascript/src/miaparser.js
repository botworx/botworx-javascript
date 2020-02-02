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
