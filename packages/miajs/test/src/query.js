/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {
  assert
} = require('chai');
const {unit_, runtime, _exists, _dad, _mom, _brother, _wife} = require('./common');
const $$ = unit_(module);
const {__, $_, _$, context_, yamlcontext_, Variable, Believe} = runtime;

describe('Query', () => describe('Basic', () => it('should work', function() {
  const ctx = yamlcontext_().load($$.dataPath('cleavers.yml'));

  $$.h2("All Clauses");
  $$._(ctx.toString());

  $$.h2('Binders');
  const _$x = new Variable('$x');
  const _$d = new Variable('$d');
  const _$w = new Variable('$w');

  $$.$("ctx.query Believe, _$x, _dad, _$d");
  ctx.query(Believe, _$x, _dad, _$d)
  .exec(binder => $$._(binder));

  $$.$(`\
ctx.query Believe, _$x, _dad, _$d
.and Believe, _$d, _wife, _$w\
`
  );
  return ctx.query(Believe, _$x, _dad, _$d)
  .and(Believe, _$d, _wife, _$w)
  .exec(binder => $$._(binder));
})));
