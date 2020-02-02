const miajs = require('@botworx/miajs')
const {Context, Term, Goal, Believe, Achieve, Assert, Retract, Attempt} = miajs
const {__, $_, _$, module_, Message, Rule, Trigger, Variable, runner_} = miajs
class Table extends Term {}
class Block extends Term {}
_exists = $_('exists')
_Table1 = $_('Table1', Table)
_isClear = $_('isClear')
_True = $_('True')
_Block1 = $_('Block1', Block)
_onTop = $_('onTop')
_Block2 = $_('Block2', Block)
_Block3 = $_('Block3', Block)
_stack = $_('stack')
_blox = $_('blox')
_impasse = $_('impasse')
_status = $_('status')
_Active = $_('Active')
_halt = $_('halt')
_clear = $_('clear')
_beneath = $_('beneath')
module.exports = module_(function*() {
  _Table1,
  _Block1,
  _Block2,
  _Block3,
  this.assert(new Achieve(null,_stack,_Block1,{on: _Block2}))
  this.assert(new Achieve(null,_stack,_Block2,{on: _Block3}))
  this.def(new Trigger(Attempt,Achieve,null,_blox,null,__), function*() {
    this.defg(new Trigger(Attempt,Achieve,null,_impasse,null,__), function*() {
      _$g = new Variable('$g', (v) => v instanceof Goal)
      this.rnr.ctx.query(Believe,_$g,_status,_Active)
      .exec( (_) => {
        this.propose(_.$g)
      })
    });
    this.def(new Trigger(Assert,Achieve,__,__,__,__), function*() {
      $g = this.msg.data
      this.assert(new Believe($g,_status,_Active))
    });
    this.def(new Trigger(Retract,Goal,__,__,__,__), function*() {
      $g = this.msg.data
      
    });
    this.def(new Trigger(Attempt,Achieve,null,_stack,__,{on: __}), function*() {
      $g = this.msg.data
      $x = this.msg.data.obj
      $y = this.msg.data.on
      _$x = new Variable('$x')
      this.rnr.ctx.query(Believe,_$x,_isClear,_True)
      .exec( (_) => {
        new Believe(null,_clear,_.$x)
      })
      _$y = new Variable('$y')
      this.rnr.ctx.query(Believe,_$y,_isClear,_True)
      .exec( (_) => {
        new Believe(null,_clear,_.$y)
      })
      _$x = new Variable('$x')
      _$z = new Variable('$z')
      this.rnr.ctx.query(Believe,_$x,_onTop,_$z)
      .exec( (_) => {
        
      })
      this.assert(new Believe($x,_onTop,$y))
      
    });
    this.def(new Trigger(Attempt,Achieve,null,_clear,__,__), function*() {
      $x = this.msg.data.obj
      _$x = new Variable('$x')
      _$y = new Variable('$y')
      _$z = new Variable('$z')
      this.rnr.ctx.query(Believe,_$x,_beneath,_$y)
      .and(Believe,_$z,_isClear,_True)
      .filter((_) => _.$z != _.$x)
      .filter((_) => _.$z != _.$y)
      .exec( (_) => {
        this.propose(new Achieve(null,_stack,_.$y,{on: _.$z}))
      })
    });
    this.def(new Trigger(Retract,Believe,__,_onTop,__,__), function*() {
      $x = this.msg.data.subj
      $y = this.msg.data.obj
      
      this.assert(new Believe($y,_isClear,_True))
    });
    this.def(new Trigger(Assert,Believe,__,_onTop,__,__), function*() {
      $x = this.msg.data.subj
      $y = this.msg.data.obj
      _$y = new Variable('$y', (v) => v instanceof Block)
      this.rnr.ctx.query(Believe,_$y,_isClear,_True)
      .exec( (_) => {
        
      })
      _$x = new Variable('$x')
      _$y = new Variable('$y')
      this.rnr.ctx.query(Believe,_$x,_onTop,_$y)
      .exec( (_) => {
        this.assert(new Believe(_.$y,_beneath,_.$x))
      })
    });
  });
  new Believe(null,_blox,null)
});
if (require.main == module) { runner_().run(module.exports) }
