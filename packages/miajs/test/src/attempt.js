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
const {Term, Context, Assert, Retract, Believe, Attempt, Achieve} = runtime;
const {_, __, _$, module_, _$self, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime;
const {_Bob, _Joe, _likes, _Fish, _Peas, _get} = require('./common');

describe('Attempt', () => it('should work', function() {
  const ctx = new Context();
  const c1 = new Believe(_Bob, _likes, _Fish);
  ctx.add(c1);
  const c2 = new Believe(_Joe, _likes, _Peas);
  ctx.add(c2);

  $$.$("All Clauses");
  for (let c of ctx.clauses) {
    $$._(c.toString());
  }

  const m = new Attempt(new Achieve(_Bob, _get, _Fish));

  $$.$('Begin Task Execution');
  const rnr = new Runner();

  rnr.def(new Trigger(Attempt, Achieve, __, _get, _Fish), function() {
    const $x = this.msg.data.subj;
    return $$._(`${$x} getting Fish`);
  });

  rnr.post(m);
  return rnr.run();
}));
