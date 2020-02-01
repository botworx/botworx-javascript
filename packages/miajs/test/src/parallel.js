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
const {runner_, task_, parallel_, counter_} = runtime;

describe('Parallel', () => describe('@action', () => it('should work', function() {
  const t1 = parallel_(function() {
    this.counter(1, 5, function() {
      const counter1 = this;
      return this.task(() => $$.log(`Counter 1:  ${counter1.value}`));
    });
    return this.counter(1, 10, function() {
      const counter2 = this;
      return this.task(() => $$.log(`Counter 2:  ${counter2.value}`));
    });
  });

  return runner_().run(t1);
})));
