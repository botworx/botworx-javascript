/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {unit_, lex, parse, transpile, compile, evaluate} = require('./common');
const $$ = unit_(module);

const data =
`\
+ Bob likes Fish
+ Joe likes Fish

def (hello)
  | this.rnr.ctx
  where
    $x likes $y
    $z likes $y
    $x != $z
  -->
    | _
    + $x likes $z

def (goodbye)
  | String(this.rnr.ctx)

hello
goodbye\
`;

describe('Query', () => it('should work', function() {
  //evaluate data
  //compile data
  $$._(JSON.stringify((parse(data)), null, 2));
  //$$._ JSON.stringify (lex data), null, 2
  //$$._ transpile data
  const code = compile(data);
  $$._(code);
  return evaluate(data);
}));
