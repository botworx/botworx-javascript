var runtime = require('../lib/mia-script/runtime');
var Term = runtime.Term;
var Context = runtime.Context;
var Belief = runtime.Belief;
var Perform = runtime.Perform;
var Assert = runtime.Assert;
var Retract = runtime.Retract;
var Attempt = runtime.Attempt;
var $$_ = runtime.$$_;
var $$ = runtime.$$;
var $$self = runtime.$$self;
var Message = runtime.Message;
var Expert = runtime.Expert;
var Rule = runtime.Rule;
var Trigger = runtime.Trigger;
var Process = runtime.Process;
var $$say = $$.intern('say');
var action = function(){
  this.rule(new Trigger(null, $$say, $$_, Perform, Attempt), function(){
    var $t = this.msg.clause.obj;
    console.log($t);
  });
}
$$self.run($$.module(action));
