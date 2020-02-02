/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let c;
const {
  assert
} = require('chai');
const {unit_, runtime} = require('./common');
const $$ = unit_(module);
const {context_, Believe, believe_} = runtime;
const {__, _$, module_} = runtime;
const {_Bob, _Joe, _likes, _Fish, _Peas, _get} = require('./common');

const ctx = context_();
const c1 = believe_(_Bob, _likes, _Fish);
ctx.add(c1);
const c2 = believe_(_Joe, _likes, _Peas);
ctx.add(c2);

$$.$("All Clauses");
for (c of ctx.clauses) {
  $$._(c.toString());
}

describe('Context', function() {
  describe('@find', () => it('should work', function() {
    let r = ctx.find(Believe, _Bob, _likes, _Fish);
    $$.$("Bob, likes, Fish");
    $$._(r.toString());

    r = ctx.find(Believe, __, _likes, _Fish);
    $$.$("_, likes, Fish");
    $$._(r.toString());

    r = ctx.find(Believe, __, _likes, __);
    $$.$("_, likes, _");
    return $$._(r.toString());
  }));

  describe('@match', function() {
    it('should work', function() {
      const matches = ctx.match(Believe, _Bob, _likes, _Fish);
      $$.$("Bob, likes, Fish");
      for (r of matches) {
        $$._(r.toString())
      }
    });
    return it('should work', function() {
      const matches = ctx.match(Believe, __, _likes, __);
      $$.$("ctx.match(__, _likes, __)");
      for (r of matches) {
        $$._(r.toString())
      }
    });
  });

  describe('@iterator', function() {
    it('should work', function() {
      for (c of ctx) {
        $$._(c);
      }
    });
  });
});
