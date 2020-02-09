/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let assert, chalk, mocha, winston;
const path = require('path');
exports.assert = (assert = require('chai').assert);
exports.mocha = (mocha = require('mocha'));
exports.winston = (winston = require('winston'));
exports.chalk = (chalk = require('chalk'));

const {Unit} = require('./unit');
/*
exports.unitize = unitize = (_module) ->
  filename = mmpackage.logDir + path.basename(_module.filename, '.js') + '.json'
  logger = new winston.Logger
    level: 'silly',
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: filename })
    ]
  *hf _module
  return exports
*/

const header = function(text, chr, length) {
  const count = Math.round((length/2) - (text.length/2));
  const mod = length % 2;
  return [
    Array(count).join(chr),
    text,
    Array(count).join(chr)
  ].join(' ');
};

const hlength = 80;

class TestUnit extends Unit {
  constructor(parent) {
    super(parent);
  }
  tap() {
    beforeEach(() => {
      this.pushLogger();
    });
    afterEach(() => {
      this.popLogger();
    });
  }

  pushLogger() {
    const filename = this.logPath(path.basename(this.filename, '.js') + '.json');
    const logger = winston.createLogger({
      level: 'silly',
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: filename })
      ]});
    return super.pushLogger(logger);
  }

  dataPath(filename) {
    return path.join(this.dirname, '../data/', filename);
  }
  logPath(filename) {
    return path.join(this.dirname, '../report/log/', filename);
  }
  h1(text) {
    return this.log(header(text, '*', hlength));
  }
  h2(text) {
    return this.log(header(text, '-', hlength));
  }
    //@log chalk.red('\t' + text)
  h3(text) {
    return this.log(header(text, '-', hlength));
  }
  h4(text) {
    return this.log(header(text, '-', hlength));
  }
  $(text) {
    return this.log(chalk.red(text));
  }
  hf() {
    return this.h1(this.basename);
  }
}

exports.TestUnit = TestUnit;
