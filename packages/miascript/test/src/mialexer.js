/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const assert = require('assert');
const {unit_, grammar, MiaLexer} = require('./common');
const $$ = unit_(module);

describe('MiaLexer', () => describe('@lex', () => it('should work', function() {
  const terminals = grammar.parser.terminals_;
  const lexer = new MiaLexer();
  const data =
  `\
def (hello)

def (say $t)
| $$._($t);

say "Hello World"
say "Goodbye World"

hello\
`;
  $$.h2('Data');
  $$._(data);
  $$.h2('Tokens');
  lexer.setInput(data);
  let tok;
  const result = [];
  while ((tok = lexer.lex()) !== lexer.EOF) {
    $$._(terminals[tok]);
  }
})));
