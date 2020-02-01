/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {
  assert
} = require('chai');
const {unit_, runtime, _exists, _likes, _Fish, _Chips} = require('./common');
const $$ = unit_(module);
const {__, $_, _$, context_, yamlcontext_, Variable, Believe} = runtime;

describe('Query', () => describe('NegClause', () => it('should work', function() {
  const ctx = yamlcontext_().load($$.dataPath('bob.yml'));

  $$.h2("All Clauses");
  $$._(ctx.toString());

  $$.h2('Binders');
  const _$x = new Variable('$x');
  const _$y = new Variable('$y');
  const _$z = new Variable('$z');

  $$.$(`\
ctx.query Believe, _$x, _likes, _$y
.not Believe, _$x, _likes, _Chips\
`
  );
  return ctx.query(Believe, _$x, _likes, _Fish)
  .not(Believe, _$x, _likes, _Chips)
  .exec(binder => $$._(binder));
})));
