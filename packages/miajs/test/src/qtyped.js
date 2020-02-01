/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {
  assert
} = require('chai');
const {unit_, runtime, _exists, _on} = require('./common');
const $$ = unit_(module);
const {__, $_, _$, context_, yamlcontext_, Variable, Believe} = runtime;

describe('Query', () => describe('Typed', () => it('should work', function() {
  const ctx = yamlcontext_().load($$.dataPath('blocks.yml'));

  $$.h2("All Clauses");
  $$._(ctx.toString());

  $$.h2('Binders');
  const $x = new Variable('$x', v => v instanceof Block);
  const $y = new Variable('$y');

  $$.$("ctx.query Believe, $x, _on, $y");
  return ctx.query(Believe, $x, _on, $y)
  .exec(binder => $$._(binder));
})));
