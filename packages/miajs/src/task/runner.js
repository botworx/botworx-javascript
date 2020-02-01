/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let {$$, unit_, clone} = require('./common');
$$ = unit_(module, $$);

const {Task, Module, TS_INIT, TS_RUNNING} = require("./task");
const {_start, _impasse, Message, Propose, Attempt, Assert, Retract, Achieve} = require("../main");
const {Context} = require('../context');

class Runner extends Task {
  constructor(init) {
    super(init);
    this.ctx = new Context();
    this.posts = [];
    this.queue = [];
    this.scheduled = false;
    this.impassed = false;
    this.post(new Attempt(new Achieve(null, _start, null)));
  }

  schedule(t) {
    if (t === this) { return super.schedule(t); }

    if (t instanceof Runner) {
      t.run();
      this.schedule(this);
      return t;
    }
    //Else ...
    t.rnr = this;
    this.queue.push(t);
    this.schedule(this);
    return t;
  }

  broadcast(msg) {
    const m = clone(msg);
    $$.$(`Broadcast:\t${m}`);
    m.from = this;
    this.post(m);
    return Array.from(this.tasks).map((t) =>
      t.broadcast(m));
  }

  post(msg) {
    if (!msg.from) {
      msg.from = this;
    }
    $$.$(`Post:\t${msg}`);
    return this.posts.push(msg);
  }

  fork(t) {
    $$.$(`Fork:\t${t.msg}`);
    const child = new Runner();
    child.policy = this.policy;
    child.ctx = this.ctx;
    return child.run(t);
  }

  eval(msg) {
    switch (msg.constructor) {
      case Propose:
        $$.$(`* \t${msg}`);
        var pmsg = new Attempt();
        Object.assign(pmsg, msg);
        return Array.from(msg.from.matchRules(pmsg)).map((m) =>
          this.fork(m.to));
      case Assert:
        $$.$(`+ \t${msg}`);
        this.ctx.add(msg.data);
        return this.dispatch(msg);
      case Retract:
        $$.$(`- \t${msg}`);
        this.ctx.remove(msg.data);
        return this.dispatch(msg);
      default:
        $$.$(`Eval:\t${msg}`);
        return this.dispatch(msg);
    }
  }

  dispatch(msg) {
    return (() => {
      const result = [];
      for (let m of msg.from.matchRules(msg)) {
        $$.$(`Fire:\t${m}`);
        result.push(this.schedule(m.to));
      }
      return result;
    })();
  }

  main() {
    let t;
    let status;
    let post;
    $$.$('@main');
    while ((t = this.queue.shift())) {
      $$.$('eval tasks');
      $$.$(`Tick:\t(${t.constructor.name}) ${t.msg}`);
      status = t.action();
      if (status === TS_RUNNING) {
        this.queue.push(t);
      } else if (t.parent) {
        const pStatus = t.parent.strategy(t);
        if (pStatus === TS_RUNNING) {
          this.queue.push(t.parent);
        }
      } else if (t.caller) {
        t.caller.resume();
        this.queue.push(t.caller);
      }
    }

    while ((post = this.posts.shift())) {
      $$.$('eval posts');
      this.eval(post);
    }

    if (this.idle() && this.impasse() && !this.scheduled) { this.resolve(); }
    return this.status;
  }

  idle() {
    return (this.posts.length === 0) && (this.queue.length === 0) && (this.tasks.length === 0);
  }

  impasse() {
    $$.$("@impasse");
    if (this.impassed) { return true; }
    this.impassed = true;
    this.post(new Attempt(new Achieve(null, _impasse, null)));
    this.schedule(this);
    return false;
  }

  run(...queue) {
    for (let task of Array.from(queue)) {
      this.schedule(task);
    }
    return this;
  }
}

exports.Runner = Runner;
exports.runner_ = before => new Runner(before);

//
//Agent
//
class Agent extends Runner {
  constructor() {
    super();
  }
}

exports.Agent = Agent;
exports.agent_ = init => new Agent(init);
