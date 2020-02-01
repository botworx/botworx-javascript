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
const {runner_, sequence_} = runtime;

describe('Sequence', () => describe('In Parallel', () => it('should work', function() {
  const t1 = sequence_(function() {
    this.task(() => $$._('A'));
    this.task(() => $$._('B'));
    return this.task(() => $$._('C'));
  });

  const t2 = sequence_(function() {
    this.task(() => $$._('D'));
    this.task(function() {
      $$._('E');
      return this.fail();
    });
    return this.task(() => $$._('F'));
  });

  return runner_().run(t1, t2);
})));
