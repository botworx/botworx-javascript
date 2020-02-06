/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { assert } = require('chai');
let {$$, unit_, runtime} = require('./common');
$$ = unit_(module);
const {Term, Context, Assert, Retract, Believe, Attempt, Achieve} = runtime;
const {$_, __, actor_, module_, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime;

const { _hello, _say } = $_([ 'hello', 'say' ]);

const __main = function() {

  this.def(new OnAttempt(Achieve, null, _say, __), function() {
    const $t = this.msg.data.obj;
    return $$._($t);
  });

  this.def(new OnAttempt(Achieve, null, _hello, null), function*() {
    yield this.call(null, _say, "Hello World");
    return yield this.call(null, _say, "Goodbye World");
  });

  return this.perform(null, _hello, null);
};

describe('Actor', function() {
  $$.tap();
  return describe('@run', () => it('should work', () => actor_(__main).run()));
});
