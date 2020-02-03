const miajs = require('@botworx/miajs')
const {Context, Term, Goal, Believe, Achieve, Assert, Retract, Attempt} = miajs
const {__, $_, _$, module_, Message, Rule, Trigger, Variable, runner_} = miajs
class Table extends Term {}
class Block extends Term {}
_exists = $_('exists')
_blox = $_('blox')
_Table1 = $_('Table1', Table)
_isClear = $_('isClear')
_True = $_('True')
_Block1 = $_('Block1', Block)
_onTop = $_('onTop')
_Block2 = $_('Block2', Block)
_Block3 = $_('Block3', Block)
_stack = $_('stack')
_impasse = $_('impasse')
_status = $_('status')
_Active = $_('Active')
_halt = $_('halt')
_clear = $_('clear')
_beneath = $_('beneath')
module.exports = module_(function*() {
  this.def(new Trigger(Attempt,Achieve,null,_blox,null,__), function*() {
    this.assert(new Believe(_Table1,_exists,null))
    this.assert(new Believe(_Table1,_isClear,_True))
    this.assert(new Believe(_Block1,_exists,null))
    this.assert(new Believe(_Block1,_onTop,_Table1))
    this.assert(new Believe(_Block2,_exists,null))
    this.assert(new Believe(_Block2,_onTop,_Block1))
    this.assert(new Believe(_Block3,_exists,null))
    this.assert(new Believe(_Block3,_onTop,_Block2))
    this.assert(new Believe(_Block3,_isClear,_True))
    this.assert(new Achieve(null,_stack,_Block1,{on: _Block2}))
    this.assert(new Achieve(null,_stack,_Block2,{on: _Block3}))
    this.defg(new Trigger(Attempt,Achieve,null,_impasse,null,__), function*() {
      _$g = new Variable('$g', (v) => v instanceof Goal)
      $query = this.rnr.ctx.query(Believe,_$g,_status,_Active)
      for (const _ of $query.binders()) {
        console.log('active')
        this.propose(_.$g)
      }
    });
    this.def(new Trigger(Assert,Goal,__,__,__,__), function*() {
      $g = this.msg.data
      this.assert(new Believe($g,_status,_Active))
    });
    this.def(new Trigger(Retract,Goal,__,__,__,__), function*() {
      $g = this.msg.data
      this.retract(new Believe($g,_status,_Active))
    });
    this.def(new Trigger(Attempt,Achieve,null,_stack,__,{on: __}), function*() {
      $g = this.msg.data
      $x = this.msg.data.obj
      $y = this.msg.data.on
      _$x = new Variable('$x')
      this.rnr.ctx.query(Believe,_$x,_isClear,_True)
      for (const _ of $query.binders()) {
        yield this.call(null,_clear,_.$x)
      }
      _$y = new Variable('$y')
      this.rnr.ctx.query(Believe,_$y,_isClear,_True)
      for (const _ of $query.binders()) {
        yield this.call(null,_clear,_.$y)
      }
      _$x = new Variable('$x')
      _$z = new Variable('$z')
      $query = this.rnr.ctx.query(Believe,_$x,_onTop,_$z)
      for (const _ of $query.binders()) {
        this.retract(new Believe(_.$x,_onTop,_.$z))
      }
      this.assert(new Believe($x,_onTop,$y))
      this.retract($g)
    });
    this.def(new Trigger(Attempt,Achieve,null,_clear,__,__), function*() {
      $x = this.msg.data.obj
      _$x = new Variable('$x')
      _$y = new Variable('$y')
      _$z = new Variable('$z')
      $query = this.rnr.ctx.query(Believe,_$x,_beneath,_$y)
      .and(Believe,_$z,_isClear,_True)
      .filter((_) => _.$z != _.$x)
      .filter((_) => _.$z != _.$y)
      for (const _ of $query.binders()) {
        this.propose(new Achieve(null,_stack,_.$y,{on: _.$z}))
      }
    });
    this.def(new Trigger(Retract,Believe,__,_onTop,__,__), function*() {
      $x = this.msg.data.subj
      $y = this.msg.data.obj
      this.retract(new Believe($y,_beneath,$x))
      this.assert(new Believe($y,_isClear,_True))
    });
    this.def(new Trigger(Assert,Believe,__,_onTop,__,__), function*() {
      $x = this.msg.data.subj
      $y = this.msg.data.obj
      _$y = new Variable('$y', (v) => v instanceof Block)
      $query = this.rnr.ctx.query(Believe,_$y,_isClear,_True)
      for (const _ of $query.binders()) {
        this.retract(new Believe(_.$y,_isClear,_True))
      }
      _$x = new Variable('$x')
      _$y = new Variable('$y')
      $query = this.rnr.ctx.query(Believe,_$x,_onTop,_$y)
      for (const _ of $query.binders()) {
        this.assert(new Believe(_.$y,_beneath,_.$x))
      }
    });
  });
  yield this.call(null,_blox,null)
});
runner_().run(module.exports)
