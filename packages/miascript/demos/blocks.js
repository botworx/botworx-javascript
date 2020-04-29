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
_impasse = $_('impasse')
_status = $_('status')
_Active = $_('Active')
_clear = $_('clear')
_beneath = $_('beneath')
module.exports = function() {
  this.assert(new Believe($$subject = _Table1,_exists))
  this.assert(new Believe($$subject,_isClear,_True))
  this.assert(new Believe($$subject = _Block1,_exists))
  this.assert(new Believe($$subject,_onTop,_Table1))
  this.assert(new Believe($$subject = _Block2,_exists))
  this.assert(new Believe($$subject,_onTop,_Block1))
  this.assert(new Believe($$subject = _Block3,_exists))
  this.assert(new Believe($$subject,_onTop,_Block2))
  this.assert(new Believe($$subject,_isClear,_True))
  this.assert(new Achieve(null,_stack,_Block1,{on: _Block2}))
  this.assert(new Achieve(null,_stack,_Block2,{on: _Block3}))
  this.sig(new Trigger(Attempt,Achieve,null,_impasse,null,__), function*() {
    _$g = new Variable('$g', (v) => v instanceof Goal)
    $query = this.rnr.ctx.query(Believe,_$g,_status,_Active)
    for (const _ of $query.binders()) {
      this.propose(_.$g)
    }
    if (!$query.binders().next()) {
      yield this.halt(undefined)
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
    $query = this.rnr.ctx.query(Believe,$x,_isClear,_True)
    for (const _ of $query.binders()) {
      this.perform(null,_clear,$x)
      yield this.succeed(undefined)
    }
    $query = this.rnr.ctx.query(Believe,$y,_isClear,_True)
    for (const _ of $query.binders()) {
      this.perform(null,_clear,$y)
      yield this.succeed(undefined)
    }
    _$z = new Variable('$z')
    $query = this.rnr.ctx.query(Believe,$x,_onTop,_$z)
    for (const _ of $query.binders()) {
      this.retract(new Believe($x,_onTop,_.$z))
    }
    this.assert(new Believe($x,_onTop,$y))
    this.retract($g)
  });
  this.def(new Trigger(Attempt,Achieve,null,_clear,__,__), function*() {
    $x = this.msg.data.obj
    _$y = new Variable('$y')
    _$z = new Variable('$z')
    $query = this.rnr.ctx.query(Believe,$x,_beneath,_$y)
    .and(Believe,_$z,_isClear,_True)
    .filter((_) => _.$z != $x)
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
    $query = this.rnr.ctx.query(Believe,$y,_isClear,_True)
    .filter((_) => $y instanceof Block)
    for (const _ of $query.binders()) {
      this.retract(new Believe($y,_isClear,_True))
    }
    $query = this.rnr.ctx.query(Believe,$x,_onTop,$y)
    for (const _ of $query.binders()) {
      this.assert(new Believe($y,_beneath,$x))
    }
  });
}
if (require.main == module) { runner_(module.exports).run() }
