const vm = require('vm');

let analyze, compile, evaluate, lex, parse, transform, transpile;
const miascript = require('./index');
const {unit_, MiaLexer, MiaParser, Transformer, Analyzer, MiaCompiler, grammar, yy, Stringer} = miascript;

const $$ = unit_(module);

exports.lex = (lex = function(code, options) {
  let token;
  const terminals = grammar.parser.terminals_;
  const lexer = new MiaLexer();
  lexer.setInput(code);
  const tokens = [];
  while ((token = lexer.lex()) !== lexer.EOF) {
    tokens.push(terminals[token]);
  }
    //$$._ terminals[token]
  return tokens;
});

exports.parse = (parse = function(code, options) {
  const lexer = new MiaLexer();
  const parser = new MiaParser(lexer, yy);
  //
  /*
  try
    ast = parser.parse(code)
  catch err
    console.log err
  */
  return parser.parse(code);
  //$$.$ $$.stringify ast, null, 2
  /*
  console.log('-----------------')
  console.log(JSON.stringify(ast, null, 2))
  console.log('-----------------')
  */
});

exports.transform = (transform = function(code, options) {
  let ast = parse(code, options);
  const transformer = new Transformer();
  ast = transformer.transform(ast, options);
  return ast;
});

exports.analyze = (analyze = function(code, options) {
  let ast = transform(code, options);
  const analyzer = new Analyzer();
  ast = analyzer.analyze(ast, options);
  return ast;
});

exports.transpile = (transpile  = function(code, options) {
  const ast = analyze(code, options);
  const stringer = new Stringer();
  const compiler = new MiaCompiler(stringer);
  compiler.compile(ast, options);
  const coffeecode = stringer.toString();
  return coffeecode;
});

exports.compile = (compile = function(code, options) {
  const js = transpile(code, options);
  return js;
});

exports.evaluate = (evaluate = function(code, options) {
  const js = transpile(code, options);
  console.log(js)
  const context = { require, module };
  vm.createContext(context);
  const result = vm.runInContext(js, context);
  return result;
});
