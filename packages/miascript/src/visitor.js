/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class Delegator {
  constructor(parent, delegates) {
    this.parent = parent;
    this.delegates = delegates;
  }

  find(kind) {
    const delegate = this.delegates[kind];
    if (delegate) { return delegate; }
    if (this.parent) { return this.parent.find(kind); }
  }
}

class Visitor {
  constructor() {
    this.delegator = null;
    this.stack = [];
  }
  top(ndx) {
    if (ndx == null) { ndx = 0; }
    return this.stack[this.stack.length + (ndx-1)];
  }
  delegator_(delegates) {
    return this.delegator = new Delegator(this.delegator, delegates);
  }

  visitNode(node) {
    let child;
    if (!node) { return; }
    if (Array.isArray(node)) {
      for (child of Array.from(node)) {
        this.visit(child);
      }
      return;
    }
    if (!node._TNode) { throw new Error(JSON.stringify(node)); }
    return (() => {
      const result = [];
      for (child of Array.from(node.nodes)) {
        result.push(this.visit(child));
      }
      return result;
    })();
  }

  visit(node) {
    //if !node then throw new Error(node)
    let result;
    if (!node) { return; }
    this.save();
    this.stack.push(node);
    const delegate = this.delegator.find(node.kind);
    if (!delegate) {
      result = this.visitNode(node);
    } else {
      result = delegate.call(this, node);
    }
    this.stack.pop();
    this.restore();
    return result;
  }
}

exports.Visitor = Visitor;
