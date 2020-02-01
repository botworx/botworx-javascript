/*
 * decaffeinate suggestions:
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let $$, unit_;
const miajs = require('@botworx/miajs');
Object.assign(exports, miajs);

exports.$$ = ($$ = miajs.package_(module));
exports.unit_ = (unit_ = function(cfg, parent) {
  if (parent == null) { parent = $$; }
  return new miajs.Unit(parent).config(cfg);
});
