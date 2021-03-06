/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {
  assert
} = require('chai');
let {$$, unit_, runtime} = require('./common');
$$ = unit_(module);
const {Term, Context, Assert, Retract, Believe, Attempt, Achieve} = runtime;
const {$_, __, runner_, module_, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime;

const { _hello, _say } = $_([ 'hello', 'say' ]);

const t1 = module_(function() {

  this.def(new OnAttempt(Achieve, null, _say, __), function() {
    const $t = this.msg.data.obj;
    return $$._($t);
  });

  this.def(new OnAttempt(Achieve, null, _hello, null), function*() {
    yield this.call(null, _say, "Hello World");
    return yield this.call(null, _say, "Goodbye World");
  });

  return this.perform(null, _hello, null);
});

describe('Task', function() {
  $$.tap();
  return describe('@call', () => it('should work', () => runner_().run(t1)));
});
