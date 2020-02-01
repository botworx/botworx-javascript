/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const assert = require('assert');
const process = require('process');

let {unit_, grammar, yy, compiler, MiaLexer,
MiaParser, MiaCompiler} = require('./common');
const $$ = unit_(module);

describe('MiaCompiler', () => describe('@compile', () => it('should work', function() {
  let tok;
  let ast;
  const terminals = grammar.parser.terminals_;
  const lexer = new MiaLexer();
  const data =
`\
def (hello)

def (say $t)
| $t

say "Hello World"
say "Goodbye World"

hello\
`;
  $$.h2('Data Begin');
  $$._(data);
  $$.h2('Data End');
  $$.h2('Lex Begin');
  lexer.setInput(data);
  while ((tok = lexer.lex()) !== lexer.EOF) {
    $$._(terminals[tok]);
  }
  $$.h2('Lex End');
  /*
  Parser
  */
  const parser = new MiaParser(lexer, yy);

  $$.h2('Parse Begin');
  try {
    ast = parser.parse(data);
  } catch (err) {
    $$._(err.message);
    $$._(err.hash);
  }

  $$.h2('Parse End');
  $$.h2('AST Begin');
  $$._(JSON.stringify(ast, null, 2));
  $$.h2('AST End');

  $$.h2('Compiler Begin');
  //
  const out = process.stdout;
  //
  compiler = new MiaCompiler(out);
  return compiler.compile(ast);
})));
