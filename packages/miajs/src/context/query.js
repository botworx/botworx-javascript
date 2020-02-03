/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let query_;
const {Variable, Believe} = require('../main');

class Query {
  constructor(ctx){
    this.ctx = ctx;
    this.conds = [];
  }

  add(c) {
    c.query = this;
    c.ctx = this.ctx;
    return this.conds.push(c);
  }

  and(t, s, v, o, x) {
    const cond = new QClause(t, s, v, o, x);
    const src = this.conds[this.conds.length - 1];
    if (src) {
      cond.src = src;
    }
    this.add(cond);
    return this;
  }

  not(t, s, v, o, x) {
    const cond = new QNegClause(t, s, v, o, x);
    const src = this.conds[this.conds.length - 1];
    if (src) {
      cond.src = src;
    }
    this.add(cond);
    return this;
  }

  filter(fn) {
    const cond = new QFilter(fn);
    const src = this.conds[this.conds.length - 1];
    if (src) {
      cond.src = src;
    }
    this.add(cond);
    return this;
  }

  *binders() {
    return yield* this.conds[this.conds.length - 1].binders();
  }

  exec(onSuccess) {
    for (const binder of this.binders()) {
      return onSuccess(binder);
    }
  }
}

exports.Query = Query;
exports.query_ = (query_ = ctx => new Query(ctx));

class Condition {
  constructor() {}
  *blank() {
    return yield {};
  }
  bound(b, v) {
    if (b[v.name]) { return true; } else { return false; }
  }
  binding(b, v) {
    if (v) {
      return b[v.name];
    } else {
      return undefined;
    }
  }
}

class QFilter extends Condition {
  constructor(fn) {
    super();
    this.fn = fn;
  }
  *binders() {
    let source;
    if (this.src) {
      source = this.src.binders();
    } else {
      source = this.blank();
    }
    for (let binder of source) {
      if (this.fn(binder)) {
        yield binder;
      }
    }
  }
}

class QClause extends Condition {
  constructor(t, s, v, o, x) {
    super();
    this.t = t;
    this.s = s;
    this.v = v;
    this.o = o;
    this.x = x;
  }

  *binders() {
    let source;
    if (this.src) {
      source = this.src.binders();
    } else {
      source = this.blank();
    }
    for (var binder of source) {
      var s = this.binding(binder, this.s) || this.s;
      var o = this.binding(binder, this.o) || this.o;
      if (s instanceof Variable) {
        if (o instanceof Variable) {
          for (let c of this.ctx.match(this.t, s, this.v, o, this.x)) {
            yield Object.assign({[s.name]: c.subj, [o.name]: c.obj}, binder);
          }
        } else {
          for (let c of this.ctx.match(this.t, s, this.v, o, this.x)) {
            yield Object.assign({[s.name]: c.subj}, binder);
          }
        }
      } else {
        if (o instanceof Variable) {
          for (let c of this.ctx.match(this.t, s, this.v, o, this.x)) {
            yield Object.assign({[o.name]: c.obj}, binder);
          }
        } else {
          for (let c of this.ctx.match(this.t, s, this.v, o, this.x)) {
            yield binder;
          }
        }
      }
    }
  }
}

exports.QClause = QClause;

class QNegClause extends Condition {
  constructor(t, s, v, o, x) {
    super();
    this.t = t;
    this.s = s;
    this.v = v;
    this.o = o;
    this.x = x;
  }
  *binders() {
    let source;
    if (this.src) {
      source = this.src.binders();
    } else {
      source = this.blank();
    }
    for (var binder of source) {
      var s = this.binding(binder, this.s) || this.s;
      var o = this.binding(binder, this.o) || this.o;
      if (s instanceof Variable) {
        if (o instanceof Variable) {
          for (let c of this.ctx.match(this.t, s, this.v, o, this.x)) {
            yield Object.assign({[s.name]: c.subj, [o.name]: c.obj}, binder);
          }
        } else {
          for (let c of this.ctx.match(this.t, s, this.v, o, this.x)) {
            yield Object.assign({[s.name]: c.subj}, binder);
          }
        }
      } else {
        if (o instanceof Variable) {
          for (let c of this.ctx.match(this.t, s, this.v, o, this.x)) {
            yield Object.assign({[o.name]: c.obj}, binder);
          }
        } else {
          if (!this.ctx.exists(this.t, s, this.v, o, this.x)) {
            yield binder;
          }
        }
      }
    }
  }
}

exports.QNegClause = QNegClause;
