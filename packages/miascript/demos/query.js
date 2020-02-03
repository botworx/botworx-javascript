const miajs = require('@botworx/miajs')
const {Context, Term, Goal, Believe, Achieve, Assert, Retract, Attempt} = miajs
const {__, $_, _$, module_, Message, Rule, Trigger, Variable, runner_} = miajs
_exists = $_('exists')
_Bob = $_('Bob')
_likes = $_('likes')
_Fish = $_('Fish')
_Joe = $_('Joe')
_hello = $_('hello')
_goodbye = $_('goodbye')
module.exports = module_(function*() {
  this.assert(new Believe(_Bob,_likes,_Fish))
  this.assert(new Believe(_Joe,_likes,_Fish))
  this.def(new Trigger(Attempt,Achieve,null,_hello,null,__), function*() {
    console.log('hello')
    console.log(this.rnr.ctx)
    _$x = new Variable('$x')
    _$y = new Variable('$y')
    _$z = new Variable('$z')
    this.rnr.ctx.query(Believe,_$x,_likes,_$y)
    .and(Believe,_$z,_likes,_$y)
    .filter((_) => _.$x != _.$z)
    .exec( async (_) => {
      console.log(_)
      this.assert(new Believe(_.$x,_likes,_.$z))
    })
  });
  this.def(new Trigger(Attempt,Achieve,null,_goodbye,null,__), function*() {
    console.log('goodbye')
    console.log(String(this.rnr.ctx))
  });
  await this.call(null,_hello,null)
  await this.call(null,_goodbye,null)
});
runner_().run(module.exports)
