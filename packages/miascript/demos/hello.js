const miajs = require('@botworx/miajs')
const {Context, Term, Goal, Believe, Achieve, Assert, Retract, Attempt} = miajs
const {__, $_, _$, module_, Message, Rule, Trigger, Variable, runner_} = miajs
_exists = $_('exists')
_hello = $_('hello')
_say = $_('say')
module.exports = module_(function*() {
  this.def(new Trigger(Attempt,Achieve,null,_hello,null,__), function*() {
    this.def(new Trigger(Attempt,Achieve,null,_say,__,__), function*() {
      $t = this.msg.data.obj
      console.log($t)
    });
    yield this.call(null,_say,"Hello World")
    yield this.call(null,_say,"Goodbye World")
  });
  yield this.call(null,_hello,null)
});
if (require.main == module) { runner_().run(module.exports) }
