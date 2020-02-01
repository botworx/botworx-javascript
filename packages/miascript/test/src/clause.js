/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {unit_, parse, analyze, transpile, compile, evaluate} = require('./common');
const $$ = unit_(module);

const data =
`\
Block1
Block1 on Block2\
`;

describe('Clause', () => describe('@evaluate', () => it('should work', function() {
  //$$._ JSON.stringify (parse data), null, 2
  $$._(JSON.stringify((analyze(data)), null, 2));
  $$._(transpile(data));
  return $$._(compile(data));
})));
      //evaluate data
