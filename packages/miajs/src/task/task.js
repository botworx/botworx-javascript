/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let TS_RUNNING, TS_SUCCESS;
const {
  nextTick
} = require('process');
const {unit_, __, clone, GeneratorFunction, AsyncFunction} = require('./common');
const $$ = unit_(module);

const { EventEmitter } = require('events');
const { Policy } = require('./policy');
const { $_, Term, Message, Propose, Attempt, Assert, Retract, Achieve } = require('../main');

class TaskStatus {
  constructor(name) {
    this.name = name;
  }
  toString() { return this.name; }
}
  //toJSON: -> { type: @constructor.name, name: @name }
const TS = name => new TaskStatus(name);

const TS_INIT = TS('Init');
exports.TS_RUNNING = (TS_RUNNING = TS('Running'));
exports.end = (exports.TS_SUCCESS = (TS_SUCCESS = TS('Success')));
const TS_FAILURE = TS('Failure');
const TS_SUSPENDED = TS('Suspended');

const toStatus = function(status) {
  if (!(status instanceof TaskStatus)) {
    status = TS_SUCCESS;
  }
  return status;
};

class Task extends EventEmitter {
  static initClass() {
  
    this.property('parent', {
      get() { return this._parent; },
      set(parent) {
        this._parent = parent;
        if (this.policy) {
          this.policy.parent = parent.policy;
        } else {
          this.policy = parent.policy;
        }
      }
    }
    );
  
    this.property('msg', {
      get() { return this._msg; },
      set(msg) {
        this._msg = msg;
        this.policy = msg.from.policy;
      }
    }
    );
  }
  constructor(init) {
    super();
    this.init = init || this.init;
    this.rnr = null;
    this._msg = null;
    this._parent = null;
    this.tasks = [];
    this.result = null;
    this.status = TS_INIT;
    this.policy = null;
  }

  toJSON() {
    return {
      type: this.constructor.name,
      msg: this.msg
    };
  }

  def(trigger, action) {
    return this.addRule(new Rule(trigger, action));
  }

  sig(trigger, action) {
    // this.rnr.signal(trigger, this)
    return this.def(trigger, action);
  }

  addRule(r) {
    if (this.policy === null) {
      this.policy = new Policy(this);
    }
    return this.policy.add(r);
  }

  findRule(m) {
    return this.findRules(m).pop();
  }

  findRules(m) {
    if (this.policy) { return this.policy.find(m); }
    return [];
  }

  matchRule(m) {
    return this.matchRules(m).pop();
  }

  matchRules(m) {
    if (this.policy) { return this.policy.match(m); }
    return [];
  }

  strategy(child) {
    switch (child.status) {
      case TS_FAILURE:
        this.remove(child);
        return this.fail();
      case TS_SUCCESS:
        this.remove(child);
        if (tasks.length === 0) { return this.succeed(); }
        break;
    }
  }

  add(child) {
    child.parent = this;
    this.tasks.push(child);
    return this;
  }

  remove(child) {
    const index = this.tasks.indexOf(child);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
    return this;
  }

  /*
  EXECUTION
  */

  init() {
    if(this.main) {
      this.action = this.main;
      this.status = this.action();
    }
    return this.status;
  }

  action() {
    if (this.init instanceof GeneratorFunction) {
      const iter = this.init();
      this.action = function() {
        const result = iter.next();
        this.status = toStatus(result.value);
        return this.status;
      };
      return this.status = toStatus(this.action());
    //else if this.init instanceof AsyncFunction then this.status = (await this.init()) || TS_SUCCESS
    } else {
      this.status = toStatus(this.init());
      if(this.main) {
        this.action = this.main;
        this.status = toStatus(this.action());
      }
      return this.status;
    }
  }

  schedule(t) {
    if (t.scheduled) { return t; }
    t.scheduled = true;
    nextTick(function() {
      t.scheduled = false;
      try {
        return t.status = toStatus(t.action());
      } catch (err) {
        return t.reject(err);
      }
    });
    return t;
  }

  //Promise Support
  then(resolve, reject) {
    this.resolve = resolve;
    this.reject = reject;
    console.log('Then');
    this.status = toStatus(this.action());
    return this;
  }
  resolve() {
    return console.log('Promise Resolved');
  }
  reject(err) {
    console.log('Promise Rejected');
    throw err;
  }

  //TODO:  What if init is a generator???
  import(requirer, path) {
    return requirer(path).init.call(this);
  }
  /*
  DSL
  */
  chain(b) {
    const a = this.tasks[this.tasks.length - 1];
    if (a) {
      a.dst = b;
      b.src = a;
    }
    this.add(b);
    return this;
  }

  task(action) {
    const child = new Task(action);
    this.add(child);
    return this;
  }

  loop(action) {
    const child = new Loop(action);
    this.add(child);
    return this;
  }

  counter(from, to, action) {
    const child = new Counter(from, to, action);
    this.add(child);
    return this;
  }

  sequence(action) {
    const child = new Sequence(action);
    this.add(child);
    return this;
  }

  suspend() {
    return this.status = TS_SUSPENDED;
  }

  resume() {
    return this.status = TS_RUNNING;
  }

  succeed() {
    return this.status = TS_SUCCESS;
  }

  fail() {
    return this.status = TS_FAILURE;
  }

  broadcast(msg) {}

  post(msg) {
    msg.from = this;
    return this.rnr.post(msg);
  }

  spawn(o, wait) {
    let task;
    if (wait == null) { wait = false; }
    if (typeof o === 'function') {
      task = new Task(o);
    } else if (o instanceof Task) {
      task = o;
    } else { throw new Error('Expecting Function or Task'); }
    if (wait) {
      task.caller = this;
    }
    return this.rnr.schedule(task);
  }

  call(s, p, o, x) {
    const c = new Achieve(s, p, o, x);
    const m = new Attempt(c, this);
    m.caller = this;
    this.post(m);
    return this.suspend();
  }

  perform(s, p, o, x) {
    const c = new Achieve(s, p, o, x);
    const m = new Attempt(c, this);
    return this.post(m);
  }

  propose(c) {
    return this.post(new Propose(c, this));
  }

  attempt(c) {
    return this.post(new Attempt(c, this));
  }

  assert(c) {
    return this.post(new Assert(c, this));
  }

  retract(c) {
    return this.post(new Retract(c, this));
  }
}
Task.initClass();

exports.Task = Task;
exports.task_ = action => new Task(action);
//
class Impostor extends Task {
  constructor(identity, action) {
    super(action);
    this.identity = identity;
  }
  def(trigger, action) { return this.identity.def(trigger, action); }
}
exports.Impostor = Impostor;
//
class Chain extends Task {
  constructor(action) {
    super(action);
  }

  main() {
    const child = this.tasks[0];
    this.rnr.schedule(child);
    return this.suspend();
  }

  strategy(child) {
    this.remove(child);
    if(child.status === TS_FAILURE) {
      return this.fail();
    }
    if (child.dst) {
      return this.rnr.schedule(child.dst);
    }
  }
}

    //@resume()

exports.Chain = Chain;
exports.chain_ = action => new Chain(action);

class Parallel extends Task {
  constructor(action) {
    super(action);
  }

  main() {
    for (let child of this.tasks) {
      this.rnr.schedule(child);
    }
    return this.suspend();
  }

  strategy(child) {
    this.remove(child);
    if(child.status === TS_FAILURE) {
      return this.fail();
    }
    //else
    return this.resume();
  }
}

exports.Parallel = Parallel;

//
//Loop
//
class Loop extends Task {
  constructor(action) {
    super(action);
  }

  main() {
    const child = this.tasks.shift();
    this.tasks.push(child);
    //else
    this.rnr.schedule(child);
    return this.suspend();
  }

  strategy(child) {
    if(child.status === TS_FAILURE) {
      return this.fail();
    }
    //else
    return this.resume();
  }
}

exports.Loop = Loop;
//
//Counter
//
class Counter extends Task {
  constructor(from, to, action) {
    super(action);
    this.value = from;
    this.to = to;
    this.index = 0;
  }

  main() {
    let child = this.tasks[this.index];
    if(child === undefined) {
      child = this.tasks[(this.index = 0)];
    }
    //else
    this.rnr.schedule(child);
    return this.suspend();
  }

  strategy(child) {
    this.index++;
    if(child.status === TS_FAILURE) {
      return this.fail();
    }
    //else
    if(this.value++ === this.to) {
      return this.succeed();
    }
    //else
    return this.resume();
  }
}

exports.Counter = Counter;
//
//Sequence
//
class Sequence extends Task {
  constructor(action) {
    super(action);
  }

  main() {
    const child = this.tasks.shift();
    if(child === undefined) {
      return this.succeed();
    }
    //else
    this.rnr.schedule(child);
    return this.suspend();
  }

  strategy(child) {
    if(child.status === TS_FAILURE) {
      return this.fail();
    }
    //else
    if(this.tasks.length > 0) {
      return this.resume();
    }
    //else
    return this.succeed();
  }
}

exports.Sequence = Sequence;
//
//
//
class Method extends Sequence {
  constructor(action) {
    super(action);
  }
}

exports.Method = Method;
exports.method_ = action => new Method(action);
//
//Module
//
class Module extends Method {
  constructor(action) {
    super(action);
  }
}

exports.Module = Module;
exports.module_ = action => new Module(action);

//
//Rule
//
class Rule {
  constructor(trigger, action, produce=(action)=>new Method(action)) {
    this.trigger = trigger;
    this.action = action;
    this.produce = produce
  }

  match(msg) {
    const result = this.trigger.match(msg);
    if (!result) { return false; }
    //const t = new Method(this.action);
    const t = this.produce(this.action);
    const m = clone(msg, result);
    m.rule = this;
    m.to = t;
    t.msg = m;
    t.caller = m.caller;
    return m;
  }
}
exports.Rule = Rule;
exports.def = (t, a) => new Rule(t, a);

exports.sequence_ = action => new Sequence(action);

exports.counter_ = (from, to, action) => new Counter(from, to, action);

exports.parallel_ = action => new Parallel(action);
