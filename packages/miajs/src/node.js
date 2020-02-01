/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Function.prototype.TNode = function() {
  const proto = {
    _TNode: {
      nodeCount: 0
    },

    add(child) {
      //child.parent = @
      return this.nodes.push(child);
    },

    remove(child) {
      const index = this.nodes.indexOf(child);
      if (index > -1) { return this.nodes.splice(index, 1); }
    },

    walk(fn) {
      fn.apply(this);
      return Array.from(this.nodes).map((child) =>
        child.walk(fn));
    }
  };

  proto[Symbol.iterator] = function*() {
    return yield* (function*() {
      const result = [];
      for (let node of this.nodes) {
        result.push(yield node);
      }
      return result;
    }).call(this);
  };

  return Object.assign(this.prototype, proto);
};

Function.prototype.node = function(name) {
  const index = this.prototype._TNode.nodeCount++;
  const getter = function() {
    return this.nodes[index];
  };
  const setter = function(val) {
    return this.nodes[index] = val;
  };
  const desc = {
    get: getter,
    set: setter
  };
  return Object.defineProperty(this.prototype, name, desc);
};
