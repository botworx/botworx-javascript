/*
 * decaffeinate suggestions:
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let $$, common, unit_;
const {$_, Unit} = (common = require('../common'));
Object.assign(exports, common);

exports.$$ = ($$ = common.package_(module));
exports.unit_ = (unit_ = function(cfg, parent) { if (parent == null) { parent = $$; } return new Unit(parent).config(cfg); });
