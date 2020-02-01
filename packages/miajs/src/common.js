/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let $$, clone, unit, unit_;
require('./miajs').config();
exports.unit = (unit = require('./unit'));
const {Unit} = unit;
Object.assign(exports, unit);

require('./node');
/*
This is the ROOT module of everything
*/
const __ = undefined;
exports.__ = __;

const GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor;
exports.GeneratorFunction = GeneratorFunction;
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
exports.AsyncFunction = AsyncFunction;

Function.prototype.property = function(prop, desc) {
  return Object.defineProperty(this.prototype, prop, desc);
};

Function.prototype.iterator = function(generator) {
  return this.prototype[Symbol.iterator] = (this.prototype.iterator = generator);
};

Function.prototype.TIterable = function() {
  return this.prototype[Symbol.iterator] = function() { return this.iterator(); };
};

exports.clone = (clone = function(obj, xtra) {
  let k, v;
  if ((obj === null) || (typeof (obj) !== "object")) { return obj; }
  const temp = new obj.constructor();
  for (k in obj) {
    v = obj[k];
    temp[k] = v;
  }
  if (xtra && ('object' === typeof xtra)) {
    for (k in xtra) {
      v = xtra[k];
      temp[k] = v;
    }
  }
  return temp;
});


exports.$$ = ($$ = unit.package_(module));
exports.unit_ = (unit_ = function(cfg, parent) { if (parent == null) { parent = $$; } return new Unit(parent).config(cfg); });
