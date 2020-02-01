/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const assert = require('assert');
const {unit_, grammar, yy, compiler, MiaLexer, MiaParser} = require('./common');
const $$ = unit_(module);

describe('DefParser', () => describe('@parse', () => it('should work', function() {
  let tok;
  let ast;
  $$.h2('Data');
  const data = "say $t";
  $$._(data);

  $$.h2('Lex');
  const terminals = grammar.parser.terminals_;
  const lexer = new MiaLexer();
  lexer.setInput(data);
  while ((tok = lexer.lex()) !== lexer.EOF) {
    $$._(terminals[tok]);
  }

  $$.h2('Parse');
  const parser = new MiaParser(lexer, yy);
  try {
    ast = parser.parse(data);
  } catch (err) {
    $$._(err.message);
    $$._(err.hash);
  }

  $$.h2('AST');
  return $$._(JSON.stringify(ast, null, 2));
})));
