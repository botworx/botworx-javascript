/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let package_;
const path = require('path');
const glob = require('glob');
const winston = require('winston');
const stringify = require('json-stringify-safe');
//
const {unit_, Unit} = require('./unit');
/*
This has a lot of commonality with Project.  Merge?
*/
class Package extends Unit {
  constructor(parent){
    super(parent);
  }
  inject(k, v) {
    switch (k) {
      case 'blah':
        return this.log('blah');
      default:
        return super.inject(k, v);
    }
  }
}

exports.Package = Package;
exports.package_ = (package_ = (cfg, parent) => new Package(parent).config(cfg));
