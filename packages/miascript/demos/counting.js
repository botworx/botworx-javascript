const miajs = require('@botworx/miajs')
const {Context, Term, Goal, Believe, Achieve, Assert, Retract, Attempt} = miajs
const {__, $_, _$, module_, Message, Rule, Trigger, Variable, runner_} = miajs
_exists = $_('exists')
_countTo = $_('countTo')
_value = $_('value')
_impasse = $_('impasse')
_status = $_('status')
_Active = $_('Active')
_increment = $_('increment')
module.exports = function() {
  this.assert($$subject = new Achieve(null,_countTo,5))
  this.assert(new Believe($$subject,_value,0))
  this.sig(new Trigger(Attempt,Achieve,null,_impasse,null,__), function*() {
    _$g = new Variable('$g', (v) => v instanceof Goal)
    $query = this.rnr.ctx.query(Believe,_$g,_status,_Active)
    for (const _ of $query.binders()) {
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
  this.def(new Trigger(Attempt,Achieve,null,_countTo,__,__), function*() {
    $g = this.msg.data
    $v1 = this.msg.data.obj
    _$v2 = new Variable('$v2')
    $query = this.rnr.ctx.query(Believe,$g,_value,_$v2)
    .filter((_) => $v1 == _.$v2)
    for (const _ of $query.binders()) {
      console.log($v1)
      console.log(_.$v2)
      this.retract($g)
      yield this.succeed(undefined)
    }
    yield this.call(null,_increment,$g)
  });
  this.def(new Trigger(Attempt,Achieve,null,_increment,__,__), function*() {
    $g = this.msg.data.obj
    _$v1 = new Variable('$v1')
    $query = this.rnr.ctx.query(Believe,$g,_value,_$v1)
    for (const _ of $query.binders()) {
      this.retract(new Believe($g,_value,_.$v1))
      const $v2 = _.$v1 + 1
      this.assert(new Believe($g,_value,$v2))
      console.log($v2)
    }
  });
}
if (require.main == module) { runner_(module.exports).run() }
