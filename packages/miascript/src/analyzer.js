/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {AstVisitor} = require('./astvisitor');
const {_null, $exists, CallStmt, UnaryExpr, Clause} = require('./yy');

class AnalyzerBase extends AstVisitor {
  constructor() {
    super();
    this.delegator_({
      Module: this.visitBlock,
      Block: this.visitBlock,
      Query: this.visitQuery,
      Def: this.visitDef,
      DefG: this.visitDef,
      Trigger: this.visitTrigger,
      Variable: this.visitVar,
      Clause: this.visitClause,
      Properties: this.visitProperties,
      Property: this.visitProperty,
      Lhs: this.visitLhs,
      Assert: this.visitMessage,
      "=": this.visitBinaryExpr
    });
  }

  visitVar(n) {
    return this.scope.var_(n, this.value);
  }

  visitStatement(node) {
    this.stmt = this.scope_(node);
    return this.visitNode(node);
  }

  visitBlock(node) {
    this.block = this.scope_(node);
    return this.visitNode(node);
  }

  visitDef(node) {
    this.visit(node.trigger);
    node.body.scope = node.trigger.scope;
    return this.visit(node.body);
  }

  visitTrigger(node) {
    this.scope_(node);
    this.delegator_({
      Variable(n) {
        return this.scope.var_(n, this.value);
      }
    });
    this.value = "this.msg.data";
    this.visit(node.binding);
    this.value = "this.msg.data.subj";
    this.visit(node.subj);
    this.value = "this.msg.data.verb";
    this.visit(node.verb);
    this.value = "this.msg.data.obj";
    this.visit(node.obj);
    return this.visit(node.xtra);
  }

  visitClause(n) {
    this.visit(n.subj);
    this.visit(n.verb);
    this.visit(n.obj);
    return this.visit(n.xtra);
  }

  visitProperties(n) {
    for (let c of n.nodes) {
      this.value = `this.msg.data.${c.name}`;
      this.visit(c);
    }
  }

  visitProperty(n) {
    return this.visit(n.value);
  }

  visitQuery(node) {
    this.delegator_({
      Variable(n) {
        return this.scope.qvar_(n, this.value);
      }
    });
    return this.visitStatement(node);
  }

  visitLhs(node) {
    node.nodes[0].first = true;
    return this.visitNode(node);
  }

  visitContextualize(n) {
    this.visit(n.left);
    for (c of n.right) {
      this.visit(c);
    }
  }

  visitMessage(n) {
    return this.visit(n.arg);
  }

  visitUnaryExpr(n) {
    return this.visit(n.arg);
  }

  visitBinaryExpr(n) {
    this.visit(n.left);
    return this.visit(n.right);
  }
}

class Analyzer extends AnalyzerBase {
  constructor() {
    super();
  }

  analyze(ast, options) {
    this.visit(ast);
    return ast;
  }
}

exports.Analyzer = Analyzer;
