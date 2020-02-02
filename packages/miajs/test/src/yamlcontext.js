/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {
  assert
} = require('chai');

let {$$, unit_, $_, _$, Context, YamlContext} = require('./common');
$$ = unit_(module, $$);

describe('YamlContext', () => it('should work', function() {
  const ctx = new YamlContext().load($$.dataPath('cleavers.yml'));
  $$._(ctx);
  return ctx.clauses.map((c) =>
    $$._(_$(c)));
}));
