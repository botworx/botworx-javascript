/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {unit_, lex, parse, transform, analyze, transpile, compile, evaluate} = require('./common');
const $$ = unit_(module);

const data =
`\
defg (impasse)
  | 'Impassed'

def (goodbye)
  | String(this.rnr.ctx)

goodbye\
`;

describe('Impasse', () => it('should work', function() {
  //$$._ lex data
  //$$._ JSON.stringify (parse data), null, 2
  $$._(JSON.stringify((transform(data)), null, 2));
  //$$._ JSON.stringify (analyze data), null, 2
  $$._(transpile(data));
  //$$._ compile data
  return evaluate(data);
}));
