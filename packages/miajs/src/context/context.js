/*
 * decaffeinate suggestions:
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
  constructor(clauses=[]) {
    this.clauses = clauses;
  }
  copy () {
    const other = new Context(Array.from(this.clauses));
    return other;
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
          for (let c of v) {
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
    /*
    const index = this.clauses.indexOf(clause);
    if (index > -1) {
      this.clauses.splice(index, 1);
    }*/
    this.clauses = this.clauses.filter( (value, index, arr) => !value.isEqual(clause) )
    return this;
  }

  believe(s, v, o, x) {
    this.add(new Believe(s, v, o, x));
    return this;
  }

  exists(t, s, v, o, x) {
    for (let c of this.clauses) {
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
    for (let c of this.clauses) {
      if (c.match(t, s, v, o, x)) {
        yield c
      }
    }
  }

  query(t, s, v, o, x) {
    return new Query(this).and(t, s, v, o, x);
  }

  toString() {
    let result = '';
    for (let c of this.clauses) {
      result += c.toString() + '\n';
    }
    return result;
  }

  fromJSON(json) {
    for (let k in json) {
      var v = json[k];
      const t = v.type;
      var subj = $_(k, t);
      for (let vk in v) {
        const vv = v[vk];
        var verb = $_(vk);
        if (Array.isArray(vv)) {
          for (const obj of vv) {
            this.believe(subj, verb, $_(obj))
          }
        } else {
          this.believe(subj, verb, $_(vv));
        }
      }
    }
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
