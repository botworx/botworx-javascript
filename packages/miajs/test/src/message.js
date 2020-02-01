/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {
  assert
} = require('chai');
const {unit_, runtime} = require('./common');
const $$ = unit_(module);
const {Term, Context, Assert, Retract, Believe, believe_, Attempt, Achieve} = runtime;
const {__, module_, $$self, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime;
const {_Bob, _Joe, _likes, _Fish, _Peas, _get} = require('./common');

describe('Message', () => describe('@match', () => it('should work', function() {
  const ctx = new Context();
  const c1 = believe_(_Bob, _likes, _Fish);
  ctx.add(c1);
  const c2 = believe_(_Joe, _likes, _Peas);
  ctx.add(c2);

  $$.h2("All Clauses");
  $$._(String(ctx));
  $$._(ctx);

  $$.h2('Message Matching');
  const m = new Assert(c1);
  $$._(m.match(Assert, Believe, _Bob, _likes, _Fish));
  $$._(m.match(Retract, Believe, _Bob, _likes, _Fish));
  $$._(m.match(Assert, Believe, _Joe, _likes, _Fish));
  return $$._(m.match(Assert, Achieve, _Joe, _likes, _Fish));
})));
