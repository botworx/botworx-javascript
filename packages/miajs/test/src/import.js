const { assert} = require('chai');
const {unit_, runtime} = require('./common');
const $$ = unit_(module);
const {runner_, module_, _$} = runtime;

describe('Task', () => describe('@import', () => it('should work', () => runner_().run(module_(function() {
  this.import(require, './cleavers');
  $$.$("All Clauses");
  $$._(_$(this.rnr.ctx.clauses));
})
))));
