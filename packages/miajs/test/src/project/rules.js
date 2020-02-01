/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let __, $, $_, Achieve, attempt_, def, onAttempt, Rule, Runner, Task, task_, Variable;
const minimatch = require("minimatch");
const mm = (pattern, options) => minimatch.makeRe(pattern, options);

let {runtime, $$, unit_} = require('./common');
$$ = unit_(module);
({task_, def, $_, __, $, $_, Runner, Task, Variable, Rule, Achieve, onAttempt, attempt_} = runtime);
const {ReadFile, ConsoleWriter} = runtime.streamer;
const {project_, workspace_, sourcer_, build} = runtime.project;

const _make = $_('make');

const t1 = workspace_({
  tasks: [
    project_({
      files: '*.txt',
      rules: [
        def(onAttempt(Achieve, __, _make, 'test.js'), () => $$.h2("onAttempt(Achieve, __, _make, 'test.js')")),
        def(onAttempt(Achieve, __, _make, 'notatest.js'), () => $$.h2("onAttempt(Achieve, __, _make, 'notatest.js')")),
        def(onAttempt(Achieve, __, _make, $('x')), function() {
          $$.h2("onAttempt(Achieve, __, _make, $('x'))");
          return $$._(this.msg.$x);
        }),
        def(onAttempt(Achieve, __, _make, mm('*.js')), () => $$.h2("onAttempt(Achieve, __, _make, mm('*.js'))")),
        def(onAttempt(Achieve, __, _make, mm('*.txt')), () => $$.h2("onAttempt(Achieve, __, _make, mm('*.txt'))")),
        def(onAttempt(Achieve, __, _make, $('x', mm('*.js'))), function() {
          $$.h2("onAttempt(Achieve, __, _make, $('x', mm('*.js')))");
          return $$._(this.msg.$x);
        })
      ]})
  ]});

const t = t1;
const m = attempt_(Achieve, __, _make, 'test.js');
//$$._ m
t.broadcast(m);
t.run();
//$$._ t
