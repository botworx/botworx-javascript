/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {
  assert
} = require('chai');

const yaml = require('js-yaml');
const fs   = require('fs');

let {$$, unit_} = require('./common');
$$ = unit_(module, $$);

describe('Yaml', () => it('should work', function() {
  // Get document, or throw exception on error
  try {
    const doc = yaml.safeLoad(fs.readFileSync($$.dataPath('cleavers.yml'), 'utf8'));
    return console.log(doc);
  } catch (e) {
    return console.log(e);
  }
}));
