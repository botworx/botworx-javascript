/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let {$$, unit_} = require('./common');
$$ = unit_(module, $$);

describe('TIterable', () => it('should work', function() {
  class A {
    static initClass() {
      this.iterator(function*() {
        yield 'a';
        return yield 'b';
      });
    }
  }
  A.initClass();
  class B extends A {
    static initClass() {
      this.TIterable();
    }
    *iterator() {
      yield* super.iterator();
      return yield 'c';
    }
  }
  B.initClass();

  const b = new B();
  for (l of b) {
    $$._(l)
  }
}));
