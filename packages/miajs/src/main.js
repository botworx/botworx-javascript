/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _$, _I, _impasse, _start, $, $_, match, terms, variable_;
const {unit_, __, clone} = require('./common');
const $$ = unit_(module);
//
//The Main Classes
//

class Variable {
  constructor(name, pattern) {
    this.name = name;
    this.pattern = pattern;
  }
}

exports.Variable = Variable;
exports.$ = ($ = (exports.variable_ = (variable_ = (n, p) => new Variable(`$${n}`, p))));

exports.match = (match = function(p, v, b) {
  if (b == null) { b = true; }
  if (!b) { return false; }
  if ((p === __) || (p === v)) { return b; }
  if ((typeof p === 'function') && p(v)) { return b; }
  if (p instanceof RegExp && p.test(v)) { return b; }
  if (p instanceof Variable) {
    if (p.pattern && !match(p.pattern, v)) { return false; }
    if ('object' === typeof b) {
      b[p.name] = v;
      return b;
    }
    return {[p.name]: v};
  }
  return false;
});

class Term {
  constructor(name) {
    this.name = name;
  }
  toString() { return this.name; }
  toJSON() { return { type: this.constructor.name, name: this.name }; }
}
exports.Term = Term;

class Subject extends Term {
  constructor(n) { super(n); }
}

class Verb extends Term {
  constructor(n) { super(n); }
}

/*
Object to Term
*/
exports.terms = (terms = {});
exports.$_ = ($_ = function(arg, type) {
  switch (typeof arg) {
    case 'string':
      var term = terms[arg];
      if (!term) {
        if (!type) {
          const char = arg[0];
          if (char === char.toUpperCase()) { type = Subject;
          } else {
            type = Verb;
          }
        } else if (typeof type === 'string') {
          type = eval(`${type} = class ${type} extends Term {};`);
        }
        terms[arg] = (term = new type(arg));
      }
      return term;
    case 'object':
      var obj = {};
      for (let e of Array.from(arg)) {
        const n = '_' + e;
        obj[n] = $_(e);
      }
      return obj;
  }
});

exports._I = (_I = $_('I'));
exports._start = (_start = $_('start'));
exports._impasse = (_impasse = $_('impasse'));
/*
Object to String
*/
exports._$ = (_$ = function(obj) {
  if (obj === __) { return '__'; }
  switch (typeof obj) {
    case 'symbol':
      return Symbol.keyFor(obj);
    case 'string':
      return obj;
    default:
      if (obj instanceof Clause) {
        return `(${obj})`;
      } else {
        return String(obj);
      }
  }
});

class Clause {
  constructor(subj, verb, obj, xtra) {
    this.subj = subj;
    this.verb = verb;
    this.obj = obj;
    for (let k in xtra) {
      const v = xtra[k];
      this[k] = v;
    }
  }

  toString() {
    const xtra = [];
    for (let k in this) {
      const v = this[k];
      if ((k !== 'subj') && (k!== 'verb') && (k !== 'obj')) {
        xtra.push(`${k}: ${v}`);
      }
    }

    return [
      this.constructor.name,
      _$(this.subj),
      _$(this.verb),
      _$(this.obj),
      xtra
    ].join(' ');
  }

  toJSON() {
    return {
      type: this.constructor.name,
      subj: this.subj && JSON.stringify(this.subj),
      verb: this.verb && JSON.stringify(this.verb),
      obj:  this.obj && JSON.stringify(this.obj)
    };
  }

  match(t, s, v, o, x) {
    return this instanceof t && match(s, this.subj, match(v, this.verb, match(o, this.obj) ) );
  }
}

exports.Clause = Clause;
exports.clause_ = (t, s, v, o, x) => new t(s, v, o, x);
//
class Believe extends Clause {
  constructor(s, v, o, x) {
    super(s, v, o, x);
  }
}

exports.Believe = Believe;
exports.believe_ = (s, v, o, x) => new Believe(s, v, o, x);
//
class Goal extends Clause {
  constructor(s, v, o, x) {
    super(s, v, o, x);
  }
}
exports.Goal = Goal;
//
class Achieve extends Goal {
  constructor(s, v, o, x) {
    super(s, v, o, x);
  }
}

exports.Achieve = Achieve;

class Message {
  constructor(data, from, to) {
    this.data = data;
    this.from = from;
    this.to = to;
  }

  toString() {
    return [
      this.constructor.name,
      this.data
    ].join(' ');
  }

  toJSON() {
    return {
      type: this.constructor.name,
      data: this.data.toJSON(),
      to: this.to && this.to.toJSON(),
      from: this.from && this.from.toJSON()
    };
  }

  match(f, t, s, v, o, x) {
    return this instanceof f && this.data.match(t, s, v, o, x);
  }
}

exports.Message = Message;

class Propose extends Message {
  constructor(data, from) {
    super(data, from);
  }
}

exports.Propose = Propose;
exports.propose_ = (t, s, v, o, x) => new Propose(new t(s, v, o, x));

class Attempt extends Message {
  constructor(data, from) {
    super(data, from);
  }
}

exports.Attempt = Attempt;
exports.attempt_ = (t, s, v, o, x) => new Attempt(new t(s, v, o, x));

class Assert extends Message {
  constructor(data, from) {
    super(data, from);
  }
}

exports.Assert = Assert;
exports.assert_ = (t, s, v, o, x) => new Assert(new t(s, v, o, x));

class Retract extends Message {
  constructor(data, from) {
    super(data, from);
  }
}

exports.Retract = Retract;
exports.retract_ = (t, s, v, o, x) => new Retract(new t(s, v, o, x));
//
class Trigger {
  constructor(flavor, type, subj, verb, obj, xtra) {
    this.flavor = flavor;
    this.type = type;
    this.subj = subj;
    this.verb = verb;
    this.obj = obj;
    this.xtra = xtra;
  }

  match(m) {
    return m.match(this.flavor, this.type, this.subj, this.verb, this.obj, this.xtra);
  }
}

exports.Trigger = Trigger;
//
class OnAssert extends Trigger {
  constructor(t, s, v, o, x) {
    super(Assert, t, s, v, o, x);
  }
}
exports.OnAssert = OnAssert;
exports.onAssert = (t, s, v, o, x) => new OnAssert(t, s, v, o, x);
//
class OnRetract extends Trigger {
  constructor(t, s, v, o, x) {
    super(Retract, t, s, v, o, x);
  }
}
exports.OnRetract = OnRetract;
exports.onRetract = (t, s, v, o, x) => new OnRetract(t, s, v, o, x);

class OnAttempt extends Trigger {
  constructor(t, s, v, o, x) {
    super(Attempt, t, s, v, o, x || Achieve);
  }
}
exports.OnAttempt = OnAttempt;
exports.onAttempt = (t, s, v, o, x) => new OnAttempt(t, s, v, o, x);
