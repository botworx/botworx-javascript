/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Achieve, _Assert, _Attempt, _Believe, _Goal, _null, _Propose, _Retract, _terms, _types, builtin_, term_, type_;
exports._terms = (_terms = []);
exports._types = (_types = []);

class Node {
  static initClass() {
    this.TNode();
  }
  constructor(kind) {
    this.kind = kind || this.constructor.name;
    this.nodes = [];
  }
}
Node.initClass();
  //toJSON: -> return {kind: @kind, nodes: @nodes}

class Array extends Node {
  constructor(nodes) {
    super('Array');
    this.nodes = nodes;
  }
  toJSON() {
    return {
      kind: this.kind,
      type: this.type,
      nodes: this.nodes
    };
  }
}

exports.Array = Array;

class Property extends Node {
  constructor(name, val) {
    super('Property');
    this.name = name;
    this.value = val;
  }

  toJSON() {
    return {kind: this.kind, name: this.name, value: this.value};
  }
}

exports.Property = Property;

class Properties extends Node {
  constructor(child) {
    super('Properties');
    this.add(child);
  }
}

exports.Properties = Properties;

class Variable extends Node {
  constructor(name) {
    super('Variable');
    this.name = name;
    this.info = null;
  }

  toJSON() {
    return {kind: this.kind, name: this.name, type: this.type, info: this.info};
  }
}

exports.Variable = Variable;
//
class Term extends Node {
  constructor(name, kind='Term') {
    super(kind);
    this.name = name;
  }

  toJSON() {
    return {kind: this.kind, name: this.name, type: this.type};
  }
}

exports.term_ = (term_ = function(name) {
  let term = _terms[name];
  if (!term) {
    term = new Term(name);
    _terms[name] = term;
  }
  return term;
});

exports.Term = Term;
exports._exists = term_('exists');

class Type extends Term {
  constructor(name) {
    super(name, 'Type');
  }

  toJSON() {
    return {kind: this.kind, name: this.name, type: this.type};
  }
}

exports.type_ = (type_ = function(name) {
  let type = _types[name];
  if (!type) {
    type = new Type(name);
    _types[name] = type;
  }
  return type;
});

exports.builtin_ = (builtin_ = function(name) {
  const type = type_(name);
  type.builtin = true;
  return type;
});

exports._Goal = (_Goal = builtin_('Goal'));
exports._Achieve = (_Achieve = builtin_('Achieve'));
exports._Believe = (_Believe = builtin_('Believe'));

exports.Type = Type;

//
class Literal extends Node {
  constructor(value) {
    super('Literal');
    this.value = value;
  }

  toJSON() {
    return {kind: this.kind, value: this.value};
  }
}

exports.Literal = Literal;
exports._null = (_null = new Literal('null'));
//
class ExprList extends Node {
  constructor(child, kind='ExprList') {
    super(kind);
    if(child) {
      this.add(child);
    }
  }
}

exports.ExprList = ExprList;
//
class Block extends ExprList {
  constructor(child, kind='Block') {
    super(child, kind);
  }

  toJSON() {
    return {kind: this.kind, nodes: this.nodes};
  }
}

exports.Block = Block;
//
//Module
//
class Module extends Block {
  constructor(child) {
    super(child, 'Module');
  }
}

exports.Module = Module;

class Snippet extends Node {
  constructor(t) {
    super('Snippet');
    t = t.slice(1);
    t = t.trim();
    this.text = t;
  }

  toJSON() {
    return {kind: this.kind, text: this.text};
  }
}
exports.Snippet = Snippet;

class Code extends Node {
  constructor(t) {
    super('Code');
    t = t.substring(1, t.length - 1);
    t = t.trim();
    this.text = t;
  }

  toJSON() {
    return {kind: this.kind, text: this.text};
  }
}
exports.Code = Code;

class Paragraph extends Node {
  static initClass() {
    this.node('subj');
    this.node('list');
  }
  constructor(subj, list) {
    super('Paragraph');
    this.subj = subj;
    this.list = list;
  }
  toJSON() {
    return {
      kind: this.kind,
      type: this.type,
      subj: this.subj,
      list: this.list
    };
  }
}
Paragraph.initClass();

exports.Paragraph = Paragraph;

class Sentence extends Node {
  static initClass() {
    this.node('clause');
    this.node('list');
  }
  constructor(clause, list) {
    super('Sentence');
    this.clause = clause;
    this.list = list;
  }
  toJSON() {
    return {
      kind: this.kind,
      type: this.type,
      clause: this.clause,
      list: this.list
    };
  }
}
Sentence.initClass();

exports.Sentence = Sentence;

class Clause extends Node {
  static initClass() {
    this.node('subj');
    this.node('verb');
    this.node('obj');
  }
  constructor(subj, verb, obj, type) {
    super('Clause');
    this.subj = subj;
    this.verb = verb;
    this.obj = obj;
    if (type == null) { type = type_('Believe'); }
    this.type = type;
    this.xtra = undefined;
  }

  toJSON() {
    return {
      kind: this.kind,
      type: this.type,
      subj: this.subj,
      verb: this.verb,
      obj:  this.obj,
      xtra: this.xtra
    };
  }
}
Clause.initClass();

exports.Clause = Clause;

class Trigger extends Node {
  constructor(arg) {
    let msg;
    super('Trigger');
    if (arg instanceof Clause) {
      const clause = arg;
      if (clause.subj === _null) {
        clause.type = type_('Achieve');
        msg = new Attempt(clause);
      } else {
        clause.type = type_('Believe');
        msg = new Assert(clause);
      }
    } else {
      msg = arg;
    }

    this.flavor = msg.type;
    const expr = msg.arg;
    this.type = expr.type;
    if (expr instanceof Clause) {
      this.subj = expr.subj;
      this.verb = expr.verb;
      this.obj = expr.obj;
      this.xtra = expr.xtra;
      this.binding = expr.binding;
    } else if (expr instanceof Variable) {
      this.binding = expr;
    }
  }

  toJSON() { return {kind: this.kind, flavor: this.flavor, type: this.type, subj: this.subj, verb: this.verb, obj: this.obj, xtra: this.xtra, binding: this.binding}; }
}

exports.Trigger = Trigger;

class UnaryExpr extends Node {
  static initClass() {
    this.node('arg');
  }
  constructor(arg, kind='UnaryExpr') {
    super(kind);
    this.arg = arg;
  }

  toJSON() {
    return {kind: this.kind, arg: this.arg};
  }
}
UnaryExpr.initClass();

exports.UnaryExpr = UnaryExpr;

class PrefixExpr extends UnaryExpr {
  constructor(arg, kind='PrefixExpr') {
    super(arg, kind);
  }
}

exports.PrefixExpr = PrefixExpr;

/*
Messages
*/
exports._Propose = (_Propose = builtin_('Propose'));
exports._Attempt = (_Attempt = builtin_('Attempt'));
exports._Assert = (_Assert = builtin_('Assert'));
exports._Retract = (_Retract = builtin_('Retract'));

class Message extends PrefixExpr {
  constructor(arg, type) {
    super(arg, 'Message');

    if (type == null) { type = _Assert; }
    this.type = type;
    if (arg instanceof Clause) {
      const clause = arg;
      if (clause.subj === _null) {
        clause.type = type_('Achieve');
      }
    }
  }

  toJSON() {
    return {kind: this.kind, type: this.type, arg: this.arg};
  }
}

exports.Message = Message;

class Propose extends Message {
  constructor(arg) {
    super(arg, _Propose);
  }
}

exports.Propose = Propose;

class Attempt extends Message {
  constructor(arg) {
    super(arg, _Attempt);
  }
}

exports.Attempt = Attempt;

class Assert extends Message {
  constructor(arg) {
    super(arg, _Assert);
  }
}

exports.Assert = Assert;

class Retract extends Message {
  constructor(arg) {
    super(arg, _Retract);
  }
}

exports.Retract = Retract;

class PostfixExpr extends UnaryExpr {
  constructor(arg, kind='PostfixExpr') {
    super(arg, kind);
  }
}

exports.PostfixExpr = PostfixExpr;

class BinaryExpr extends Node {
  static initClass() {
    this.node('left');
    this.node('right');
  }
  constructor(left, right, kind='BinaryExpr') {
    super(kind);
    this.left = left;
    this.right = right;
  }

  toJSON() {
    return {kind: this.kind, op: this.op, left: this.left, right: this.right};
  }
}
BinaryExpr.initClass();

exports.BinaryExpr = BinaryExpr;

class Contextualize extends Node {
  static initClass() {
    this.node('left');
    this.node('right');
  }
  constructor(left, right) {
    super('Contextualize');
    this.left = left;
    this.right = right;
  }

  toJSON() {
    return {kind: this.kind, left: this.left, right: this.right};
  }
}
Contextualize.initClass();

exports.Contextualize = Contextualize;

class Statement extends Node {
  constructor(kind='Statement') {
    super(kind);
  }

  toJSON() {
    return {kind: this.kind};
  }
}

exports.Statement = Statement;

class Def extends Statement {
  static initClass() {
    this.node('trigger');
    this.node('body');
  }
  constructor(trigger, body, kind='Def') {
    super(kind);
    this.trigger = trigger;
    this.body = body;
  }

  toJSON() {
    return {kind: this.kind, name: this.name, trigger: this.trigger, body: this.body};
  }
}
Def.initClass();

exports.Def = Def;

class Sig extends Def {
  constructor(trigger, body) {
    super(trigger, body, 'Sig');
  }
}
exports.Sig = Sig;

class ImportStmt extends Statement {
  constructor(expr) {
    super('ImportStmt');
    this.expr = expr;
  }

  toJSON() {
    return {kind: this.kind, expr: this.expr};
  }
}

exports.ImportStmt = ImportStmt;

//
class Query extends Statement {
  static initClass() {
    this.node('lhs');
    this.node('rhs');
  }
  constructor(lhs, rhs) {
    super('Query');
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toJSON() { return {kind: this.kind, lhs: this.lhs, rhs: this.rhs}; }
}
Query.initClass();

exports.Query = Query;

class Condition extends Node {
  static initClass() {
    this.node('expr');
  }
  constructor(expr, kind='Condition') {
    super(kind);
    this.expr = expr;
  }

  toJSON() {
    return {kind: this.kind, expr: this.expr};
  }
}
Condition.initClass();

exports.Condition = Condition;

class QClause extends Condition {
  constructor(expr) {
    super(expr, 'QClause');
  }
}

exports.QClause = QClause;

class QNegClause extends Condition {
  constructor(expr) {
    super(expr, 'QNegClause');
  }
}

exports.QNegClause = QNegClause;

class QFilter extends Condition {
  constructor(expr) {
    super(expr, 'QFilter');
  }
}

exports.QFilter = QFilter;

class Lhs extends ExprList {
  constructor(child, kind) {
    super(child, 'Lhs');
  }
}

exports.Lhs = Lhs;

class Rhs extends Block {
  constructor(child, kind) {
    super(child, 'Rhs');
  }
}

exports.Rhs = Rhs;
//
class Actions extends Node {
  constructor(body, kind) {
    super(kind);
    this.body = body;
  }

  toJSON() {
    return {kind: this.kind, body: this.body};
  }
}

exports.Actions = Actions;
//
class Action extends Node {
  constructor(expr, kind='Action') {
    super(kind);
    this.expr = expr;
  }

  toJSON() {
    return {kind: this.kind, expr: this.expr};
  }
}

exports.Action = Action;

//
class Return extends Node {
  constructor(expr) {
    super('Return');
    this.expr = expr;
  }

  toJSON() {
    return {kind: this.kind, expr: this.expr};
  }
}

exports.Return = Return;

class Halt extends Node {
  constructor(expr) {
    super('Halt');
    this.expr = expr;
  }

  toJSON() {
    return {kind: this.kind, expr: this.expr};
  }
}

exports.Halt = Halt;
