/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {$_, _$, Believe, clause_} = require('../main');
const {Query} = require('./query');

class Context {
  static initClass() {
    this.iterator(function*() {
      return yield* this.clauses;
    });
  }
  constructor() {
    this.clauses = [];
  }
  load(loader) {
    return loader.load(this);
  }
  config(cfg) {
    if (!cfg) { return this; }
    for (let k in cfg) {
      const v = cfg[k];
      switch (k) {
        case 'clauses':
          for (let c of Array.from(v)) {
            this.add(c);
          }
          break;
        default:
          this[k] = v;
      }
    }
    return this;
  }

  add(c) {
    if (Array.isArray(c)) {
      return this.clauses = this.clauses.concat(c);
    } else {
      return this.clauses.push(c);
    }
  }

  remove(clause) {
    const index = this.clauses.indexOf(clause);
    if (index > -1) {
      this.clauses.splice(index, 1);
    }
    return this;
  }

  believe(s, v, o, x) {
    this.add(new Believe(s, v, o, x));
    return this;
  }

  exists(t, s, v, o, x) {
    for (let c of Array.from(this.clauses)) {
      if (c.match(t, s, v, o, x)) {
        return true;
      }
    }
    return false;
  }

  find(t, s, v, o, x) {
    const result = [];
    for (let c of this.match(t, s, v, o, x)) {
      result.push(c);
    }
    return result;
  }

  *match(t, s, v, o, x) {
    return yield* (function*() {
      const result = [];
      for (let c of Array.from(this.clauses)) {
        if (c.match(t, s, v, o, x)) {
          result.push(yield c);
        } else {
          result.push(undefined);
        }
      }
      return result;
    }).call(this);
  }

  query(t, s, v, o, x) {
    return new Query(this).and(t, s, v, o, x);
  }

  toString() {
    let result = '';
    for (let c of Array.from(this.clauses)) {
      result += c.toString() + '\n';
    }
    return result;
  }

  fromJSON(json) {
    return (() => {
      const result = [];
      for (let k in json) {
        var v = json[k];
        const t = v.type;
        var subj = $_(k, t);
        result.push((() => {
          const result1 = [];
          for (let vk in v) {
            const vv = v[vk];
            var verb = $_(vk);
            if (Array.isArray(vv)) {
              result1.push(Array.from(vv).map((obj) =>
                this.believe(subj, verb, $_(obj))));
            } else {
              result1.push(this.believe(subj, verb, $_(vv)));
            }
          }
          return result1;
        })());
      }
      return result;
    })();
  }
  /*
  fromJSON: (json) ->
    for k, v of json
      subj = $_ k
      for vk, vv of v
        verb = $_ vk
        if Array.isArray vv
          for obj in vv
            @add clause_ subj, verb, obj
        else
          @add clause_ subj, verb, vv
  */
}
Context.initClass();
exports.Context = Context;
exports.context_ = cfg => new Context().config(cfg);

/*
class ContextFactory
class ContextImporter extends ContextFactory
class YamlContextImporter extends ContextImporter
  constructor:
*/
