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
const {task_, chain_, runner_} = runtime;

const t1 = chain_(function() {
  return this.chain(task_(() => $$._('What\'s'))).chain(task_(() => $$._('Up'))).chain(task_(() => $$._('Doc'))
  );
});

describe('Task', () => describe('@chain', () => it('should work', () => runner_().run(t1))));
