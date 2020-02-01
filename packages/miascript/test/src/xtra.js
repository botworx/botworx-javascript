/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {unit_, parse, transpile, compile, evaluate} = require('./common');
const $$ = unit_(module);

const data =
`\
def ($x likes $y with: $z)
  | "#{$x} likes #{$y} with #{$z}"

+ Bob likes Tuna with: Cheese\
`;

describe('Xtra', () => describe('@evaluate', () => it('should work', function() {
  //evaluate data
  //compile data
  $$._(JSON.stringify((parse(data)), null, 2));
  $$._(transpile(data));
  const code = compile(data);
  $$._(code);
  return evaluate(data);
})));
