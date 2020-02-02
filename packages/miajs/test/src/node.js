/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let {$$, unit_} = require('./common');
$$ = unit_(module, $$);

class Plain {}

class Node {
  static initClass() {
    this.TNode();
    this.node('node1');
    this.node('node2');
  }
  constructor() {
    this.nodes = [];
    this.node1 = 1;
    this.node2 = 2;
  }
}
Node.initClass();

class DerivedNode extends Node {
  static initClass() {
    this.node('node3');
  }
  constructor(e) {
    super();
    this.node3 = e;
  }
}
DerivedNode.initClass();
describe('TNode', () => it('should work', function() {
  let node;
  $$.$('class Plain');
  $$._(Plain);
  //
  $$.$('class Node');
  $$._(Node.toString());
  $$.$('class Node.prototype');
  $$._(Node.prototype);
  //
  $$.$('class DerivedNode');
  $$._(DerivedNode.toString());
  $$.$('class DerivedNode.prototype');
  $$._(DerivedNode.prototype);
  //
  $$.$('n1.Node');
  const n1 = new Node();
  n1.node1 = 0;
  n1.node2 = 2;
  n1.node1 = 1;
  $$._(n1);
  $$.$('nodes');
  for (node of n1) {
    $$._(node);
  }

  $$.$('n2.DerivedNode');
  const n2 = new DerivedNode(3);

  $$._(n2);
  $$.$('nodes');
  for (node of n2) {
    $$._(node);
  }
}));
