/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class Policy {
  constructor() {
    this.parent = null;
    this.rules = [];
  }

  add(r) {
    return this.rules.push(r);
  }

  find(msg) {
    let result = [];
    for (let r of Array.from(this.rules)) {
      if (r.match(msg)) {
        result.push(r);
      }
    }
    let policy = this.parent;
    while (policy) {
      const rules = policy.find(msg);
      result = result.concat(rules);
      policy = policy.parent;
    }
    return result;
  }

  *match(msg) {
    for (let r of Array.from(this.rules)) {
      var m;
      if (m = r.match(msg)) {
        yield m;
      }
    }
    let policy = this.parent;
    return yield* (function*() {
      const result = [];
      while (policy) {
        yield* policy.match(msg);
        result.push(policy = policy.parent);
      }
      return result;
    }).call(this);
  }
}

exports.Policy = Policy;
