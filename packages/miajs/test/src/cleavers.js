/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {unit_, runtime} = require('./common');
const $$ = unit_(module);
const {$_, module_, context_, yamlcontext_} = runtime;

module.exports = module_(function() {
  return this.rnr.ctx = yamlcontext_().load($$.dataPath('cleavers.yml'));
});
