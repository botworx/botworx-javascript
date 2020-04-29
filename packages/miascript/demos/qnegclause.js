const miajs = require('@botworx/miajs')
const {Context, Term, Goal, Believe, Achieve, Assert, Retract, Attempt} = miajs
const {__, $_, _$, module_, Message, Rule, Trigger, Variable, runner_} = miajs
_exists = $_('exists')
_Bob = $_('Bob')
_likes = $_('likes')
_Fish = $_('Fish')
_Chips = $_('Chips')
_Joe = $_('Joe')
_start = $_('start')
_impasse = $_('impasse')
module.exports = function() {
  this.assert(new Believe($$subject = _Bob,_exists))
  this.assert(new Believe($$subject,_likes,_Fish))
  this.assert(new Believe($$subject,_likes,_Chips))
  this.assert(new Believe($$subject = _Joe,_exists))
  this.assert(new Believe($$subject,_likes,_Fish))
  this.sig(new Trigger(Attempt,Achieve,null,_start,null,__), function*() {
    console.log(this.rnr.ctx)
    _$x = new Variable('$x')
    $query = this.rnr.ctx.query(Believe,_$x,_likes,_Fish)
    .not(Believe,_$x,_likes,_Chips)
    for (const _ of $query.binders()) {
      console.log(_.$x)
    }
  });
  this.sig(new Trigger(Attempt,Achieve,null,_impasse,null,__), function*() {
    console.log(String(this.rnr.ctx))
  });
}
if (require.main == module) { runner_(module.exports).run() }
