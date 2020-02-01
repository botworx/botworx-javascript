/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const minimatch = require("minimatch");
const {Minimatch} = minimatch;

const {unit_, lex, parse, analyze, transpile, compile, evaluate} = require('./common');
const $$ = unit_(module);

const mm = (pattern, options) => minimatch.makeRe(pattern, options);

$$._(mm('Block/Clause'));
$$._(mm('**/Clause'));
const r1 = mm('**/Clause');
const r2 = mm('Clause');
const r3 = new RegExp(r1 + '|' + r2);
$$._(r1.exec('Block/Clause'));
$$._(r1.exec('Clause'));
$$._(r1.exec('Module/Block/Clause'));

$$._(r3);
$$._(r3.exec('Module/Block/Clause'));
