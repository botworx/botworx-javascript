const fs = require('fs');
const vm = require('vm');

let analyze, compile, evaluate, lex, parse, transform, transpile;
const miascript = require('./index');
const {unit_, MiaLexer, MiaParser, Transformer, Analyzer, MiaCompiler, grammar, yy, Stringer} = miascript;

const $$ = unit_(module);

exports.defaults = defaults = {
  ast: true
}

exports.lex = (lex = function(code, options=defaults) {
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

exports.parse = (parse = function(code, options=defaults) {
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

exports.transform = (transform = function(code, options=defaults) {
  let ast = parse(code, options);
  const transformer = new Transformer();
  ast = transformer.transform(ast, options);
  return ast;
});

exports.analyze = (analyze = function(code, options=defaults) {
  let ast = transform(code, options);
  const analyzer = new Analyzer();
  ast = analyzer.analyze(ast, options);
  return ast;
});

exports.transpile = (transpile  = function(code, options=defaults) {
  const ast = analyze(code, options);
  if (options.ast && options.fileName) {
    const { fileName } = options;
    const outFileName = fileName.substr(0, fileName.lastIndexOf(".")) + ".json";
    const out = fs.createWriteStream(outFileName);
    json = JSON.stringify(ast, null, 2);
    out.write(json);
    out.end();
  }
  const stringer = new Stringer();
  const compiler = new MiaCompiler(stringer);
  compiler.compile(ast, options);
  const js = stringer.toString();
  return js;
});

exports.compile = (compile = function(code, options=defaults) {
  const js = transpile(code, options);
  return js;
});

exports.evaluate = (evaluate = function(code, options=defaults) {
  const js = transpile(code, options);
  console.log(js)
  const context = { require, module };
  vm.createContext(context);
  const result = vm.runInContext(js, context);
  return result;
});
