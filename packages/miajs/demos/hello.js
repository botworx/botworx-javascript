(function() {
  var $$, $_, Achieve, Assert, Attempt, Believe, Context, Message, Retract, Rule, Trigger, _$, __, _hello, _say, module_, runner_;

  $$ = require('miascript');

  ({Context, Believe, Achieve, Assert, Retract, Attempt} = $$);

  ({__, $_, _$, module_, Message, Rule, Trigger, runner_} = $$);

  _hello = $_('hello');

  _say = $_('say');

  module.exports = module_(function() {
    this.def(new Trigger(Attempt, null, _hello, null, Achieve), function() {
      this.def(new Trigger(Attempt, null, _say, __, Achieve), function() {
        var $t;
        $t = this.msg.clause.obj;
        return console.log($t);
      });
      this.call(null, _say, "Hello World");
      return this.call(null, _say, "Goodbye World");
    });
    return this.call(null, _hello, null);
  });

  if (require.main === module) {
    runner_().run(module.exports);
  }

}).call(this);
