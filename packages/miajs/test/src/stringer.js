/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {
  assert
} = require('chai');

let {$$, unit_, _$, Stringer} = require('./common');
$$ = unit_(module, $$);

describe('Stringer', () => it('should work', function() {
  const stringer = new Stringer();
  stringer.write('Hello');
  stringer.write('World');
  $$._(stringer);
  $$._(stringer.toString());
  return $$._(String(stringer));
}));
