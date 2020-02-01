const yaml = require('js-yaml');
const fs   = require('fs');

const {Context} = require('./context');
const {$_, _$} = require('../main');


class YamlContext extends Context {
  constructor() {
    super();
  }
  load(filename) {
    let doc;
    try {
      doc = yaml.safeLoad(fs.readFileSync(filename), 'utf8');
    } catch (e) {
      console.log(e);
    }
    this.fromJSON(doc);
    return this;
  }
}

exports.YamlContext = YamlContext;
exports.yamlcontext_ = cfg => new YamlContext().config(cfg);
