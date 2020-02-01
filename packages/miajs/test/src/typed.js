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
const {$_, Term} = runtime;

describe('Term', () => describe('typed', () => it('should work', function() {
  //t = $_ 'Block1', 'Block'
  class Table extends Term {}
  const t1 = $_('Table1', Table);
  $$._(t1);

  const t2 = $_('Block1', 'Block');
  return $$._(t2);
})));
