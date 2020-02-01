/*
 * decaffeinate suggestions:
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let $$, runtime, unit_;
exports.runtime = (runtime = require('../../src'));
const {$_, TestUnit} = runtime;
Object.assign(exports, runtime);

const defs = $_([
  'Bob',
  'Joe',
  'Fish',
  'Chips',
  'Tuna',
  'Cheese',
  'Peas',

  'exists',
  'on',
  'age',
  'likes',
  'get',
  'catch',
  'buy',
  'eat',

  'dad',
  'mom',
  'brother',
  'wife'
]);
for (let k in defs) {
  const v = defs[k];
  exports[k] = v;
}

exports.$$ = ($$ = runtime.package_(module));
exports.unit_ = (unit_ = function(cfg, parent) { if (parent == null) { parent = $$; } return new TestUnit(parent).config(cfg); });
