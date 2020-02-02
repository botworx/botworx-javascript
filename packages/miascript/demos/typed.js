const miajs = require('@botworx/miajs')
const {Context, Term, Goal, Believe, Achieve, Assert, Retract, Attempt} = miajs
const {__, $_, _$, module_, Message, Rule, Trigger, Variable, runner_} = miajs
class Table extends Term {}
class Block extends Term {}
_exists = $_('exists')
_Table1 = $_('Table1', Table)
_Block1 = $_('Block1', Block)
_Block2 = $_('Block2', Block)
_Block3 = $_('Block3', Block)
_on = $_('on')
_put = $_('put')
_Block4 = $_('Block4')
_Block = $_('Block')
_hello = $_('hello')
_goodbye = $_('goodbye')
module.exports = module_(function*() {
  this.assert(new Believe(_Table1,_exists,null))
  this.assert(new Believe(_Block1,_exists,null))
  this.assert(new Believe(_Block2,_exists,null))
  this.assert(new Believe(_Block3,_exists,null))
  this.assert(new Believe(_Block1,_on,_Block2))
  this.assert(new Achieve(_Block1,_on,_Block2))
  this.assert(new Achieve(null,_put,_Block1,{on: _Block2}))
  this.assert(new Achieve(_Block1,_on,_Block2))
  this.def(new Trigger(Attempt,Achieve,null,_hello,null,__), function*() {
    _$x = new Variable('$x', (v) => v instanceof Block)
    this.rnr.ctx.query(Believe,_$x,_exists,null)
    .exec( (_) => {
      console.log(_.$x)
    })
  });
  this.def(new Trigger(Attempt,Achieve,null,_goodbye,null,__), function*() {
    console.log(String(this.rnr.ctx))
  });
  yield this.call(null,_hello,null)
  yield this.call(null,_goodbye,null)
});
if (require.main == module) { runner_().run(module.exports) }
