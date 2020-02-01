(function() {
  var $_, Achieve, Assert, Attempt, Believe, Context, Message, Retract, Rule, Trigger, Variable, _$, _Bob, _Cheese, _Tuna, __, _likes, miajs, module_, runner_;

  miajs = require('@botworx/miajs');

  ({Context, Believe, Achieve, Assert, Retract, Attempt} = miajs);

  ({__, $_, _$, module_, Message, Rule, Trigger, Variable, runner_} = miajs);

  _likes = $_('likes');

  _Bob = $_('Bob');

  _Tuna = $_('Tuna');

  _Cheese = $_('Cheese');

  module.exports = module_(function() {
    this.def(new Trigger(Assert, __, _likes, __, Believe), function() {
      var $x, $y, $z;
      $x = this.msg.clause.subj;
      $y = this.msg.clause.obj;
      $z = this.msg.clause.with;
      return console.log(`${$x} likes ${$y} with ${$z}`);
    });
    return this.assert(new Believe(_Bob, _likes, _Tuna, {
      with: _Cheese
    }));
  });

  if (require.main === module) {
    runner_().run(module.exports);
  }

}).call(this);
