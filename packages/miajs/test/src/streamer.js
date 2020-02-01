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
const {task_, chain_, runner_, Task} = runtime;
const {ReadFile, ConsoleWriter} = runtime.streamer;

describe('Streamer', () => describe('@chain', () => it('should work', function() {
  const t1 = chain_(function() {
    return this.chain(new ReadFile($$.dataPath('test.txt')))
    .chain(new ConsoleWriter);
  });

  return runner_().run(t1);
})));
