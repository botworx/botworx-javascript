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
const {task_, sequence_, runner_} = runtime;

const t1 = task_(function() {
  $$._('hello');
  return this.add(task_(() => $$._('world'))
  );
});

const s1 = sequence_(function() {
  return this.add(task_(() => $$._('Hey'))).add(task_(() => $$._('Dude'))
  );
});

describe('Sequence', () => describe('@action', () => it('should work', () => runner_().run(s1))));
