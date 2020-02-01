const { assert } = require('chai');
let {$$, unit_, runtime} = require('./common');
$$ = unit_(module);
const {Term, Context, Assert, Retract, Believe, Attempt, Achieve} = runtime;
const {$_, __, runner_, module_, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime;

const { _hello, _say } = $_([ 'hello', 'say' ]);

const foo = () => new Promise((resolve, reject) => resolve(true));

class MyPromise {
  constructor() {}
  then(resolve, reject) {
    this.resolve = resolve;
    this.reject = reject;
    console.log(arguments);
    console.log('Then');
    console.log(this);
    return this.resolve('Howdy');
  }
}

const foo2 = () => new MyPromise();

describe('Await', () => {
  $$.tap();

  it('should work', async () => {
    const bar = async () => console.log(await foo());
    return bar;
  });

  return it('should work also', async () => {
    const bar = async () => console.log(await foo2());
    return bar;
  });
});
