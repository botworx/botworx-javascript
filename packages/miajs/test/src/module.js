/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {
  assert
} = require('chai');
const {unit_, runtime} = require('./common');
const $$ = unit_(module);
const {Term, Context, context_, Assert, Retract, Believe, believe_, Attempt, Achieve} = runtime;
const {__, _impasse, _$, runner_, module_, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime;
const {_Bob, _Joe, _likes, _Fish, _Peas, _get} = require('./common');

describe('Module', () => describe('@action', () => it('should work', function() {
  const ctx = context_();
  const c1 = believe_(_Bob, _likes, _Fish);
  ctx.add(c1);
  const c2 = believe_(_Joe, _likes, _Peas);
  ctx.add(c2);

  $$.$("All Clauses");
  for (let c of Array.from(ctx.clauses)) {
    $$._(c.toString());
  }

  const m = new Assert(c1);

  $$.$('Begin Task Execution');
  const exports = module_(function() {

    this.def(new Trigger(Assert, Believe, __, _likes, _Fish), function() {
      const self = this;
      return this.task(function() {
        $$._('Task Fire 1:');
        return this.perform(self.msg.data.subj, _get, _Fish);}).task(() => $$._('Task Fire 2:'));
    });

    this.def(new Trigger(Attempt, Achieve, __, _get, _Fish), function() {
      const self = this;
      return this.task(() => $$._(_$(self.msg.data.subj) + ' is getting Fish.'));
    });

    this.defg(new Trigger(Attempt, Achieve, null, _impasse, null), () => //$$._ String(this.rnr.ctx)
    $$._('Impassed'));

    return this.post(m);
  });


  return runner_().run(exports);
})));
