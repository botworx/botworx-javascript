/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS101: Remove unnecessary use of Array.from
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
    return Array.from(this.binders()).map((binder) =>
      onSuccess(binder));
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
    return yield* (function*() {
      const result = [];
      for (let binder of source) {
        if (this.fn(binder)) {
          result.push(yield binder);
        } else {
          result.push(undefined);
        }
      }
      return result;
    }).call(this);
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
    return yield* (function*() {
      const result = [];
      for (var binder of source) {
        var s = this.binding(binder, this.s) || this.s;
        var o = this.binding(binder, this.o) || this.o;
        if (s instanceof Variable) {
          if (o instanceof Variable) {
            result.push(yield* (function*() {
              const result1 = [];
              for (let c of this.ctx.match(this.t, s, this.v, o, this.x)) {
                result1.push(yield Object.assign({[s.name]: c.subj, [o.name]: c.obj}, binder));
              }
              return result1;
            }).call(this));
          } else {
            result.push(yield* (function*() {
              const result2 = [];
              for (let c of this.ctx.match(this.t, s, this.v, o, this.x)) {
                result2.push(yield Object.assign({[s.name]: c.subj}, binder));
              }
              return result2;
            }).call(this));
          }
        } else {
          if (o instanceof Variable) {
            result.push(yield* (function*() {
              const result3 = [];
              for (let c of this.ctx.match(this.t, s, this.v, o, this.x)) {
                result3.push(yield Object.assign({[o.name]: c.obj}, binder));
              }
              return result3;
            }).call(this));
          } else {
            result.push(yield* (function*() {
              const result4 = [];
              for (let c of this.ctx.match(this.t, s, this.v, o, this.x)) {
                result4.push(yield binder);
              }
              return result4;
            }).call(this));
          }
        }
      }
      return result;
    }).call(this);
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
    return yield* (function*() {
      const result = [];
      for (var binder of source) {
        var s = this.binding(binder, this.s) || this.s;
        var o = this.binding(binder, this.o) || this.o;
        if (s instanceof Variable) {
          if (o instanceof Variable) {
            result.push(yield* (function*() {
              const result1 = [];
              for (let c of this.ctx.match(this.t, s, this.v, o, this.x)) {
                result1.push(yield Object.assign({[s.name]: c.subj, [o.name]: c.obj}, binder));
              }
              return result1;
            }).call(this));
          } else {
            result.push(yield* (function*() {
              const result2 = [];
              for (let c of this.ctx.match(this.t, s, this.v, o, this.x)) {
                result2.push(yield Object.assign({[s.name]: c.subj}, binder));
              }
              return result2;
            }).call(this));
          }
        } else {
          if (o instanceof Variable) {
            result.push(yield* (function*() {
              const result3 = [];
              for (let c of this.ctx.match(this.t, s, this.v, o, this.x)) {
                result3.push(yield Object.assign({[o.name]: c.obj}, binder));
              }
              return result3;
            }).call(this));
          } else {
            if (!this.ctx.exists(this.t, s, this.v, o, this.x)) {
              result.push(yield binder);
            } else {
              result.push(undefined);
            }
          }
        }
      }
      return result;
    }).call(this);
  }
}

exports.QNegClause = QNegClause;
