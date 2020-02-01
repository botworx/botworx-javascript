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

const t1 = method_(function() {
  return this.counter(1, 10, function() {
    const counter1 = this;
    return this.task(() => $$._(`Count = ${counter1.value}`));
  });
});

describe('Method', () => describe('@counter', () => it('should work', () => runner_().run(t1))));
