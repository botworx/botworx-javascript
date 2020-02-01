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
const {Term, Context, Propose, Attempt, Assert, Retract, Believe, Achieve} = runtime;
const {__, _$, module_, _impasse, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime;
const {_Bob, _Joe, _likes, _Fish, _Peas, _get, _catch, _buy, _eat} = require('./common');

describe('Propose', () => it('should work', function() {
  const ctx = new Context();
  const c1 = new Believe(_Bob, _likes, _Fish);
  ctx.add(c1);
  const c2 = new Believe(_Joe, _likes, _Peas);
  ctx.add(c2);

  $$.$("All Clauses");
  $$._(String(ctx));

  const m = new Propose(new Achieve(_Bob, _eat, _Fish));

  $$.$('Begin Task Execution');
  const rnr = new Runner();

  rnr.def(new Trigger(Attempt, Achieve, __, _eat, _Fish), function() {
    const $x = this.msg.data.subj;
    return $$._(`${$x} buying Fish`);
  });

  rnr.def(new Trigger(Attempt, Achieve, __, _eat, _Fish), function() {
    const $x = this.msg.data.subj;
    return $$._(`${$x} catching Fish`);
  });

  rnr.def(new Trigger(Attempt, Achieve, null, _impasse, null), () => //$$._ String(this.rnr.ctx)
  $$._('Impassed'));

  rnr.post(m);
  return rnr.run();
}));
