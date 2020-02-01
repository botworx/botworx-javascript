/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const assert = require('assert');
const {unit_, grammar, yy, compiler, MiaLexer, MiaParser} = require('./common');
const $$ = unit_(module);

describe('MiaParser', () => describe('@parse', () => it('should work', function() {
  let tok;
  let ast;
  const terminals = grammar.parser.terminals_;
  const lexer = new MiaLexer();
  $$.h2('Data');
  const data =
  `\
def (hello)

def (say $t)
| $t

say "Hello World"
say "Goodbye World"

hello\
`;
  $$._(data);
  $$.h2('Lex');
  lexer.setInput(data);
  while ((tok = lexer.lex()) !== lexer.EOF) {
    $$._(terminals[tok]);
  }
  /*
  Parser
  */
  const parser = new MiaParser(lexer, yy);

  $$.h2('Parse');
  try {
    ast = parser.parse(data);
  } catch (err) {
    $$._(err.message);
    $$._(err.hash);
  }

  $$.h2('AST');
  return $$._(JSON.stringify(ast, null, 2));
})));
