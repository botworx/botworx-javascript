/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {unit_, lex, parse, analyze, transpile, compile, evaluate} = require('./common');
const $$ = unit_(module);

/*
Implicit Asserts
*/
const data =
`\
Block1
Block1 on Block2
Bob likes A & B & C
Bob :Person
  likes Fish & Chips
  hates Anchovies\
`;

describe('Assert', () => describe('@evaluate', () => it('should work', function() {
  $$._(lex(data));
  //$$._ JSON.stringify (parse data), null, 2
  $$._(JSON.stringify((analyze(data)), null, 2));
  $$._(transpile(data));
  return $$._(compile(data));
})));
      //evaluate data
