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
const {Term, Context, context_, Assert, Retract, Believe, believe_, Attempt, Achieve} = runtime;
const {__, $, _$, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, runner_, Method} = runtime;

const {_Bob, _Joe, _likes, _Fish, _Tuna, _Cheese, _Peas, _get} = require('./common');

describe('Clause', () => describe('@xtra', () => it('should work',  function() {
  const ctx = context_();
  const c1 = believe_(_Bob, _likes, _Tuna, {with: _Cheese});
  ctx.add(c1);
  const c2 = believe_(_Joe, _likes, _Peas);
  ctx.add(c2);

  $$.h2("All Clauses");
  for (let c of ctx.clauses) {
    $$._(c.toString());
  }

  $$.h2("Find in Context");
  let r = ctx.find(Believe, _Bob, _likes, _Tuna);
  $$.$("< Bob likes Tuna >");
  $$._(r.toString());

  r = ctx.find(Believe, __, _likes, _Tuna);
  $$.$("< __ likes Tuna >");
  $$._(r.toString());

  r = ctx.find(Believe, __, _likes, __);
  $$.$("< __ likes __ >");
  $$._(r.toString());

  $$.h2("Message Matches");
  const m = new Assert(c1);
  $$._(m.match(Assert, Believe, __, _likes, _Tuna));
  $$._(m.match(Assert, Believe, _Bob, _likes, _Tuna));
  $$._(m.match(Assert, Believe, _Bob, _likes, _Fish));
  $$._(m.match(Retract, Believe, _Bob, _likes, _Fish));
  $$._(m.match(Assert, Believe, _Joe, _likes, _Fish));

  const rnr = runner_();

  rnr.def(new OnAssert(Believe, __, _likes, _Tuna), function() {
    const $x = this.msg.data.subj;
    return this.task(function() {
      $$._('A');
      return this.perform($x, _get, _Fish);}).task(() => $$._('B'));
  });

  rnr.def(new OnAttempt(Achieve, __, _get, _Fish),  function() {
    const $x = this.msg.data.subj;
    return $$._(`${$x} is getting Fish.`);
  });

  rnr.post(m);
  return rnr.run();
})));
