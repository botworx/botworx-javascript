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
const {method_, runner_} = runtime;

describe('Loop', () => describe('@action', () => it('should work', function() {
  const t1 = method_(function() {
    return this.loop(function() {
      return this.task(function() {
        $$._("Hello");
        this.count = 10;
        return this.main = function() {
          $$._(this.count--);
          if(this.count <= 0) {
            $$._('Inner');
            return this.fail();
          }
        };}).task(() => $$._("Loop"));
    });
  });

  return runner_().run(t1);
})));
