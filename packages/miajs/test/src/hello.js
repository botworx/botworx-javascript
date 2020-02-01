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
const {$_, __, runner_, module_, Message, Policy, Rule, Trigger, OnAssert, OnRetract, onAttempt, Runner, Method} = runtime;

const {_hello, _say} = $_(['hello', 'say']);

describe('Task', () => describe('@perform', () => it('should work', function() {
  const action = function() {
    this.def(onAttempt(Achieve, null, _hello, null), function() {
      this.def(onAttempt(Achieve, null, _say, __), function() {
        const $t = this.msg.data.obj;
        return $$.log($t);
      });
      this.perform(null, _say, "Hello World");
      return this.perform(null, _say, "Goodbye World");
    });
    return this.perform(null, _hello, null);
  };

  return runner_().run(module_(action));
})));
