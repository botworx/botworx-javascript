/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {unit_, parse, compile, evaluate} = require('./common');
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

describe('AST', () => describe('@evaluate', () => it('should work', function() {
  const ast = parse(data);
  return $$._($$.stringify(ast, null, 2));
})));
