/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const process = require('process');
let {$$, unit_, config} = require('./common');
$$ = unit_(module, $$);

describe('Config', () => it('should work', function() {
  $$.$('Config Results');
  $$._(config());
  $$.$('Environment');
  return $$._(process.env);
}));
