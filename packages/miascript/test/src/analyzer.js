/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {unit_, parse, analyze, compile, evaluate} = require('./common');
const $$ = unit_(module);

const data =
`\
def (hello)

  def (say $t)
    | $t

  say "Hello World"
  say "Goodbye World"

hello\
`;

describe('Analyzer', () => describe('@analyze', () => it('should work', function() {
  const ast = analyze(data);
  return $$._($$.stringify(ast, null, 2));
})));
