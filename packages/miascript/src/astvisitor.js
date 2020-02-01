/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {Visitor} = require('./visitor');

class Scope {
  constructor(parent) {
    this.parent = parent;
    this.vars = {};
  }

  add(v) {
    const k = v.name;
    if (!this.vars[k]) {
      this.vars[k] = v;
    }
    return this.vars[k];
  }

  var_(v, r){
    const {name, type} = v;
    return v.info = this.add({name, value: r, type});
  }

  qvar_(v, r){
    const {name, type} = v;
    return v.info = this.add({name, value: r, type, qvar: true});
  }

  find(k) {
    const v = this.vars[k];
    if (v) { return v; }
    if (this.parent) { return this.parent.find(k); }
  }
}

//exports.Scope = Scope

class AstVisitor extends Visitor {
  constructor() {
    super();
    this.states = [];
    //State members
    this.scope = null;
    this.block = null;
    this.stmt = null;
    this.subj = null;
    this.value = null;
  }

  scope_(node) {
    if (node.scope) {
      this.scope = node.scope;
    } else {
      this.scope = new Scope(this.scope);
      node.scope = this.scope;
    }
    return node;
  }

  var_(k, v){
    return this.scope.add(k, {key: k, value: v});
  }

  qvar_(k, v){
    return this.scope.add(k, {key: k, value: v, qvar: true});
  }

  save() {
    return this.states.push({
      delegator: this.delegator,
      scope: this.scope,
      block: this.block,
      stmt: this.stmt,
      subj: this.subj,
      value: this.value
    });
  }

  restore() {
    return ({delegator: this.delegator, scope: this.scope, block: this.block, stmt: this.stmt, subj: this.subj, value: this.value} = this.states.pop());
  }

  visitNode(node) {
    let result;
    if (node.scope) {
      //@save()
      this.scope = node.scope;
      result = super.visitNode(node);
      //@restore()
    } else {
      result = super.visitNode(node);
    }
    return result;
  }
}

exports.AstVisitor = AstVisitor;
