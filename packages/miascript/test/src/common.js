/*
 * decaffeinate suggestions:
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let $$, assert, chalk, mocha, unit_, winston;
const path = require('path');
exports.assert = (assert = require('chai').assert);
exports.mocha = (mocha = require('mocha'));
exports.winston = (winston = require('winston'));
exports.chalk = (chalk = require('chalk'));

const miascript = require('../../src');
Object.assign(exports, miascript);

exports.$$ = ($$ = miascript.package_(module));
exports.unit_ = (unit_ = function(cfg, parent) {
  if (parent == null) { parent = $$; }
  return new miascript.TestUnit(parent).config(cfg);
});
