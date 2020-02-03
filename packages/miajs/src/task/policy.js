class Policy {
  constructor() {
    this.parent = null;
    this.rules = [];
  }

  add(r) {
    this.rules.push(r);
  }

  find(msg) {
    let result = [];
    for (let r of this.rules) {
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
    for (let r of this.rules) {
      var m;
      if (m = r.match(msg)) {
        yield m;
      }
    }
    let policy = this.parent;
    while (policy) {
      yield* policy.match(msg);
      policy = policy.parent;
    }
  }
}

exports.Policy = Policy;
