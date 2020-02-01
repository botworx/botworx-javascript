(function() {
  var $$, $_, Achieve, Assert, Attempt, Believe, Context, Message, Retract, Rule, Trigger, _$, _Bob, _Cheese, _Fish, _Pizza, _Tuna, __, _likes, module_, runner_;

  $$ = require('miascript');

  ({Context, Believe, Achieve, Assert, Retract, Attempt} = $$);

  ({__, $_, _$, module_, Message, Rule, Trigger, runner_} = $$);

  _likes = $_('likes');

  _Pizza = $_('Pizza');

  _Bob = $_('Bob');

  _Fish = $_('Fish');

  _Cheese = $_('Cheese');

  _Tuna = $_('Tuna');

  module.exports = module_(function() {
    var $x, $y;
    this.def(new Trigger(Assert, __, _likes, _Pizza, Believe), function() {
      var $x;
      $x = this.msg.clause.subj;
      return console.log($x + " says Yum!!!");
    });
    this.assert(new Believe(_Bob, _likes, _Fish));
    this.assert(new Believe(_Bob, _likes, _Pizza));
    this.assert(new Believe(_Bob, _likes, _Cheese));
    $x = _Bob;
    $y = new Believe(_Bob, _likes, _Tuna, {
      with: _Cheese
    });
    return this.assert($y);
  });

  if (require.main === module) {
    runner_().run(module.exports);
  }

}).call(this);
