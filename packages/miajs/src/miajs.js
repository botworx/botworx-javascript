/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let mia;
const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');
const process = require('process');

class MiaJs {
  constructor() {
    this.env = 'development';
  }
  config(folder) {
    let doc;
    folder = folder || __dirname;
    try {
      doc = yaml.safeLoad(fs.readFileSync(path.join(folder, '../config/config.yml'), 'utf8'));
    } catch (e) {
      console.log(e);
    }

    const cfg = doc[this.env];
    for (let k in cfg) {
      const v = cfg[k];
      process.env[k] = v;
    }
  }
}

exports.mia = (mia = new MiaJs());
exports.config = folder => mia.config(folder);
