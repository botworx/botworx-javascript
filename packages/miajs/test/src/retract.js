/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
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

describe('Retract', () => it('should work', function() {
  let c;
  const rnr = new Runner();
  const {
    ctx
  } = rnr;
  const c1 = new Believe(_Bob, _likes, _Fish);
  ctx.add(c1);
  const c2 = new Believe(_Joe, _likes, _Peas);
  ctx.add(c2);

  $$.$("Context Before");
  for (c of Array.from(ctx.clauses)) {
    $$._(c.toString());
  }

  const m = new Retract(c1);

  $$.$('Begin Task Execution');

  rnr.def(new Trigger(Retract, Believe, __, _likes, _Fish), function() {
    const $x = this.msg.data.subj;
    return $$._(`${$x} doesn't like Fish`);
  });

  rnr.post(m);
  return rnr.run().then(function() {
    $$.$("Context After");
    return (() => {
      const result = [];
      for (c of Array.from(ctx.clauses)) {
        result.push($$._(c.toString()));
      }
      return result;
    })();
  });
}));
