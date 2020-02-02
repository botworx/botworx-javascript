/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { AstVisitor } = require('./astvisitor');
const { Analyzer } = require('./analyzer');
const {_terms, _types, Block, _Propose, _Attempt, _Assert} = require('./yy');

class CompilerBase extends AstVisitor {
  constructor() {
    super();
    this.delegator_({
      // Paragraph: this.visitParagraph,
      Action: this.visitAction,
      Array: this.visitArray,
      Literal: this.visitLiteral,
      Variable: this.visitVariable,
      Property: this.visitProperty,
      Properties: this.visitProperties,
      Term: this.visitTerm,
      Type: this.visitType,
      Block: this.visitBlock,
      Module: this.visitModule,
      CallStmt: this.visitCallStmt,
      ImportStmt: this.visitImport,
      Def: this.visitDef,
      DefG: this.visitDefG,
      BinaryExpr: this.visitBinaryExpr,
      UnaryExpr: this.visitUnaryExpr,
      Clause: this.visitClause,
      Trigger: this.visitTrigger,
      Query: this.visitQuery,
      QClause: this.visitQClause,
      QNegClause: this.visitQNegClause,
      QFilter: this.visitQFilter,
      "-->": this.visitSuccess,
      Snippet: this.visitSnippet,
      Message: this.visitMessage,
      "=": this.visitBinaryExpr,
      "!=": this.visitBinaryExpr
    });
  }

  visitParagraph(n) {
    const arr = [];
    for (let c of n.list) {
      arr.push(this.visit(c));
    }
    return arr.join('')
  }

  visitAction(n) {
    console.log(n)
    const result = this.visit(n.expr)
    if (result) {
      this.writeLn(result);
    }
  }

  visitArray(n) {
    const arr = [];
    for (let c of n.nodes) {
      arr.push(this.visit(c));
    }
    return [
      '[',
      arr.join(),
      ']'
    ].join('');
  }

  visitSnippet(n) {
    this.writeLn(`console.log(${n.text})`);
  }

  visitLiteral(n) {
    return n.value;
  }

  visitVariable(n) {
    return '$' + n.name;
  }

  visitTerm(n) {
    return '_' + n.name;
  }

  visitType(n) {
    return n.name;
  }

  visitProperties(n) {
    const arr = [];
    for (let c of n.nodes) {
      arr.push(this.visit(c));
    }
    return [
      '{',
      arr,
      '}'
    ].join('');
  }

  visitProperty(n) {
    return [
      n.name, ': ',
      this.visit(n.value)
    ].join('');
  }

  visitQuery(node) {
    let v;
    if (node.scope) {
      for (let k in node.scope.vars) {
        v = node.scope.vars[k];
        if (v.type) {
          this.writeLn(`_$${k} = new Variable('$${k}', (v) => v instanceof ${v.type.name})`);
        } else {
          this.writeLn(`_$${k} = new Variable('$${k}')`);
        }
      }
    }
    this.delegator_({
      Variable(n) {
        v = this.scope.find(n.name);
        if (v.qvar) { return `_.$${n.name}`; } else { return visitVariable(n); }
      }
    });
    return this.visitNode(node);
  }

  visitBlock(node) {
    if (node.scope) {
      for (let k in node.scope.vars) {
        const v = node.scope.vars[k];
        let val = v.value
        if (!val) {
          val = 'undefined'
        }
        this.writeLn(`let $${k} = ${val}`);
      }
    }
    return this.visitNode(node);
  }

  visitModule(n) {
    let k, v;
    this.write(`\
const miajs = require('@botworx/miajs')
const {Context, Term, Goal, Believe, Achieve, Assert, Retract, Attempt} = miajs
const {__, $_, _$, module_, Message, Rule, Trigger, Variable, runner_} = miajs\
`
    );
    this.writeLn('');

    for (k in _types) {
      v = _types[k];
      if (!v.builtin) {
        this.writeLn(['class ', k, ' extends Term {}'].join(''));
      }
    }

    for (k in _terms) {
      v = _terms[k];
      if (v.type) {
        this.writeLn(['_', k, " = $_('", k, `', ${v.type.name})`].join(''));
      } else {
        this.writeLn(['_', k, " = $_('", k, "')"].join(''));
      }
    }

    this.writeLn("module.exports = module_(function*() {");
    this.indent();
    this.visitBlock(n);
    this.dedent();
    this.writeLn("});")
    if (!this.options.filename) { //were running in a sandbox
      this.writeLn("runner_().run(module.exports)");
    } else {
      this.writeLn("if (require.main == module) { runner_().run(module.exports) }");
    }
  }

  visitImport(n) {
    this.writeLn(['require(', n.expr.value, ').action.call(this)'].join(''));
  }

  visitDef(n) {
    this.writeLn(['this.def(', this.visit(n.trigger), ', function*() {'].join(''));
    this.indent();
    this.visit(n.body);
    this.dedent();
    this.writeLn('});');
  }

  visitDefG(n) {
    this.writeLn(['this.defg(', this.visit(n.trigger), ', function*() {'].join(''));
    this.indent();
    this.visit(n.body);
    this.dedent();
    this.writeLn('});');
  }

  visitTrigger(node) {
    this.save();
    this.delegator_({
      Variable(n) {
        return '__';
      }
    });
    return [
      'new Trigger(',
      [
        this.visit(node.flavor),
        this.visit(node.type),
        this.visit(node.subj) || '__',
        this.visit(node.verb) || '__',
        this.visit(node.obj) || '__',
        this.visit(node.xtra) || '__'
      ].join(),
      ')'
    ].join('');
  }

  visitMessage(n) {
    let list;
    if (Array.isArray(n.arg)) { list = n.arg; } else { list = [n.arg]; }
    for (let c of list) {
      switch (n.type) {
        case _Assert:
          this.writeLn(["this.assert(", this.visit(c), ")"].join(''));
          break;
        case _Attempt:
          this.visitCallStmt(n);
          break;
        case _Propose:
          this.writeLn(["this.propose(", this.visit(c), ")"].join(''));
          break;
      }
    }
  }

  visitCallStmt(n) {
    return this.writeLn([
      'yield this.call(',
      [
        this.visit(n.arg.subj),
        this.visit(n.arg.verb),
        this.visit(n.arg.obj),
      ].join(),
      ')'
    ].join(''));
  }

  visitClause(n) {
    return [
      'new ',
      this.visit(n.type),
      '(',
      [
        this.visit(n.subj),
        this.visit(n.verb),
        this.visit(n.obj),
        this.visit(n.xtra)
      ].filter(function(x){ if (x) { return x; } }).join(),
      ')'
    ].join('');
  }

  visitQClause(node) {
    this.delegator_({
      Variable(n) {
        if (n.info.qvar) {
          return '_$' + n.name;
        } else {
          return '$' + n.name;
        }
      }
    });
    const c = node.expr;
    const header = node.first ? "this.rnr.ctx.query(" : ".and(";
    return this.writeLn([
      header,
      [
        this.visit(c.type),
        this.visit(c.subj),
        this.visit(c.verb),
        this.visit(c.obj)
      ].join(),
      ")"
    ].join('')
    );
  }

  visitQNegClause(node) {
    this.delegator_({
      Variable(n) {
        if (n.info.qvar) {
          return '_$' + n.name;
        } else {
          return '$' + n.name;
        }
      }
    });
    const c = node.expr;
    const header = node.first ? "this.rnr.ctx.query(" : ".not(";
    return this.writeLn([
      header,
      [
        this.visit(c.type),
        this.visit(c.subj),
        this.visit(c.verb),
        this.visit(c.obj)
      ].join(),
      ")"
    ].join('')
    );
  }

  visitQFilter(node) {
    return this.writeLn([
      ".filter((_) => ",
      this.visit(node.expr),
      ")"
    ].join('')
    );
  }

  visitSuccess(node) {
    this.writeLn(".exec( (_) => {");
    this.indent();
    this.visit(node.body);
    this.dedent();
    this.writeLn('})')
  }

  visitUnaryExpr(n) {
    return [
      `${n.kind} `,
      this.visit(n.arg)
    ].join('');
  }

  visitBinaryExpr(n) {
    const result = [
      this.visit(n.left),
      ` ${n.kind} `,
      this.visit(n.right)
    ].join('');
    if (this.top(-1) instanceof Block) {
      this.writeLn(result)
    } else {
      return result
    }
  }
}

class MiaCompiler extends CompilerBase {
  constructor(out) {
    super();
    this.out = out;
    this.indentlevel = 0;
    this.indentation = '';
    this.analyzer = new Analyzer();
  }

  compile(ast, options) {
    this.options = options || {};
    this.analyzer.analyze(ast, options);
    return this.visit(ast);
  }

  write(s) {
    //console.log(s)
    if(this.out === undefined) {
      return;
    }
    return this.out.write(s);
  }

  writeLn(s) {
    //console.log(this.indentation + s)
    if(this.out === undefined) {
      return;
    }
    return this.out.write(this.indentation + s + '\n');
  }

  joinLn(s) {
    return this.indentation + s + '\n';
  }

  indent(s) {
    this.indentlevel += 1;
    return this.indentation = (new Array(this.indentlevel + 1)).join('  ');
  }

  dedent(s) {
    this.indentlevel -= 1;
    return this.indentation = (new Array(this.indentlevel + 1)).join('  ');
  }
}

exports.MiaCompiler = MiaCompiler;
