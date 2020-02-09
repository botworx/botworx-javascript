const {AstVisitor} = require('./astvisitor');
const {
  _null, _exists, _Achieve, Block, Action, CallStmt, Query, Rhs,
  Attempt, Assert, Clause, Literal, Paragraph, BinaryExpr
} = require('./yy');

class Transformer extends AstVisitor {
  constructor() {
    super();
    this.delegator_({
      Block: this.visitBlock,
      Query: this.visitQuery,
      Rhs: this.visitRhs,
      "-->": this.visitSuccess,
      Term: this.visitTerm,
      Clause: this.visitClause,
      Sentence: this.visitSentence,
      Paragraph: this.visitParagraph
    });
  }

  transform(ast, options) {
    this.visit(ast);
    return ast;
  }

  visitNode(node) {
    let child, index;
    if (!node) { return; }
    if (Array.isArray(node)) {
      for (index = 0; index < node.length; index++) {
        child = node[index];
        node[index] = this.visit(child);
      }
      return node;
    }
    if (!node._TNode) {
      throw new Error(`Does not implement TNode:  ${JSON.stringify(node)}`);
    }
    for (index = 0; index < node.nodes.length; index++) {
      child = node.nodes[index];
      node.nodes[index] = this.visit(child);
    }
    return node;
  }

  visitBlock(node) {
    return this.visitNode(node);
  }

  visitQuery(node) {
    return this.visitNode(node);
  }

  visitRhs(node) {
    return this.visitNode(node);
  }

  visitSuccess(node) {
    this.visit(node.body);
    return node
  }

  visitTerm(node) {
    if (this.top(-1) instanceof Block) {
      return new Assert(new Clause(node, _exists, _null));
    }
    return node;
  }

  visitClause(node) {
    console.log(node)
    if (this.top(-1) instanceof Block) {
      if (node.subj === _null) {
        node.type = _Achieve;
        return new Attempt(node);
      } else {
        return new Assert(node);
      }
    } else {
      if ((node.subj === _null) && this.subj) {
        node.subj = this.subj;
      }
    }
    return node;
  }

  visitSentence(node) {
    const { clause } = node;
    const {subj, verb} = clause;
    const result = [this.visitClause(clause)];
    for (let obj of node.list) {
      result.push(this.visitClause(new Clause(subj, verb, obj)));
    }
    return result;
  }

  visitParagraph(node) {
    this.visitNode(node);
    const subj = new Literal('$$subject')
    if (node.subj.subj === _null) {
      node.subj.type = _Achieve;
    }
    let result = [new BinaryExpr(subj, this.visit(node.subj), '=')]
    this.subj = subj
    for (let clause of node.list) {
      const subclause = this.visitClause(clause);
      if (Array.isArray(subclause)) {
        result = result.concat(subclause);
      } else {
        result.push(subclause);
      }
    }
    return result;
  }
}

exports.Transformer = Transformer;
