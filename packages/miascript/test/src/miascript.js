/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {unit_, parse, transform, compile, evaluate} = require('./common');
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

describe('MiaScript', function() {
  $$.h2('Data');
  $$._(data);

  describe('@parse', () => it('should work', function() {
    $$.h2('Parse');
    return $$._(JSON.stringify((parse(data)), null, 2));
  }));

  describe('@transform', () => it('should work', function() {
    $$.h2('Transform');
    return $$._(JSON.stringify((transform(data)), null, 2));
  }));

  describe('@compile', () => it('should work', function() {
    $$.h2('Code');
    const code = compile(data);
    return $$._(code);
  }));

  return describe('@evaluate', () => it('should work', function() {
    $$.h2('Evaluation');
    return evaluate(data);
  }));
});
