/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let unit_;
const path = require('path');
const glob = require('glob');
const winston = require('winston');
const {Module} = require('module');
/*
This has a lot of commonality with Project.  Merge?
*/
class Unit {
  static initClass() {
    //
    this.prototype.stringify = require('json-stringify-safe');
    this.prototype.debug = require('debug')('miajs');
  }
  constructor(parent) {
    this.parent = parent;
    this.exports = null;
    this.units = [];
    this.logger = console;
    this.loggers = [];
    /*
    @logger = new winston.Logger
      level: 'silly',
      transports: [
        new winston.transports.Console()
      ]
    */
  }
  toJSON() {
    return {filename: this.filename};
  }
  inject(k, v) {
    switch (k) {
      case 'module':
        this.module = v;
        this.filename = this.module.filename;
        this.dirname = path.dirname(this.filename);
        return this.basename = path.basename(this.filename);
      default:
        return this[k] = v;
    }
  }
  config(cfg) {
    if (cfg instanceof Module) { cfg = {module: cfg}; }
    for (let k in cfg) {
      const v = cfg[k];
      this.inject(k, v);
    }
    return this;
  }
  add(child) {
    return this.units.push(child);
  }
  pushLogger(logger) {
    this.loggers.push(this.logger);
    return this.logger = logger;
  }
  popLogger() {
    return this.logger = this.loggers.pop();
  }
  log(txt) {
    return this.logInfo(txt);
  }
  _(txt) {
    return this.logInfo(txt);
  }
  logInfo(txt) {
    return this.logger.info(txt);
  }
  $(text) { return this.debug(text); }
}
Unit.initClass();

exports.Unit = Unit;
exports.unit_ = (unit_ = (cfg, parent) => new Unit(parent).config(cfg));
