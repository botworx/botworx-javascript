const miajs = require('@botworx/miajs')
const {Context, Term, Goal, Believe, Achieve, Assert, Retract, Attempt} = miajs
const {__, $_, _$, module_, Message, Rule, Trigger, Variable, runner_} = miajs
_exists = $_('exists')
_likes = $_('likes')
_Pizza = $_('Pizza')
_Bob = $_('Bob')
_Fish = $_('Fish')
_Cheese = $_('Cheese')
_Tuna = $_('Tuna')
module.exports = function() {
  $x = undefined
  $y = undefined
  this.def(new Trigger(Assert,Believe,__,_likes,_Pizza,__), function*() {
    $x = this.msg.data.subj
    console.log($x + " says Yum!!!")
  });
  this.assert(new Believe($$subject = _Bob,_exists))
  this.assert(new Believe($$subject,_likes,_Fish))
  this.assert(new Believe($$subject,_likes,_Pizza))
  this.assert(new Believe(_Bob,_likes,_Cheese))
  $x = _Bob
  $y = new Believe(_Bob,_likes,_Tuna,{with: _Cheese})
  this.assert($y)
}
if (require.main == module) { runner_(module.exports).run() }
