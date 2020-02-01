/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Function.prototype.TEdgeNode = function() {
  const proto = {
    _TEdgeNode: {
      edgeCount: 0
    },
    add(child) {
      return this.edges.push({label: 'child', target: child});
    },
    remove(child) {
      let i;
      let asc, end;
      for (i = 0, end = this.edges.length(-1), asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
        if (this.edges[i].target = child) { break; }
      }
      if (i > -1) { return this.nodes.splice(i, 1); }
    },
    walk(fn) {
      fn.apply(this);
      return Array.from(this).map((child) =>
        child.walk(fn));
    }
  };
  proto[Symbol.iterator] = function*() {
    return yield* (function*() {
      const result = [];
      for (let edge of this.edges) {
        result.push(yield edge.target);
      }
      return result;
    }).call(this);
  };
  return Object.assign(this.prototype, proto);
};

Function.prototype.edge = function(name) {
  const index = this.prototype._TEdgeNode.edgeCount++;
  const getter = function() {
    return this.edges[index].target;
  };
  const setter = function(val) {
    return this.edges[index] = {label: name, target: val};
  };
  const desc = {
    get: getter,
    set: setter
  };
  return Object.defineProperty(this.prototype, name, desc);
};
