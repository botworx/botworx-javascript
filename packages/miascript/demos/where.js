(function() {
  var $_, Achieve, Assert, Attempt, Believe, Context, Message, Retract, Rule, Trigger, Variable, _$, _Bob, _Cheese, _Fish, __, _likes, _say, miajs, module_, runner_;

  miajs = require('@botworx/miajs');

  ({Context, Believe, Achieve, Assert, Retract, Attempt} = miajs);

  ({__, $_, _$, module_, Message, Rule, Trigger, Variable, runner_} = miajs);

  _Bob = $_('Bob');

  _likes = $_('likes');

  _Fish = $_('Fish');

  _say = $_('say');

  _Cheese = $_('Cheese');

  module.exports = module_(function() {
    var $x;
    this.assert(new Believe(_Bob, _likes, _Fish));
    this.def(new Trigger(Attempt, null, _say, __, Achieve), function() {
      var $t;
      $t = this.msg.clause.obj;
      return console.log($t);
    });
    $x = new Variable('x');
    this.rnr.ctx.query($x, _likes, _Fish).exec((binder) => {});
    $x = new Variable('x');
    return this.rnr.ctx.query($x, _likes, _Cheese).exec((binder) => {});
  });

  if (require.main === module) {
    runner_().run(module.exports);
  }

}).call(this);
