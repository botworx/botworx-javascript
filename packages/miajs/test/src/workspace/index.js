/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let __, $, $_, $$, attempt_, def, onAttempt, Rule, Runner, Task, task_, Variable;
const minimatch = require("minimatch");
const mm = (pattern, options) => minimatch.makeRe(pattern, options);

const {runtime} = require('./common');
({task_, def, $_, __, $$, $, $_, Runner, Task, Variable, Rule, onAttempt, attempt_} = runtime);
const {ReadFile, ConsoleWriter} = runtime.streamer;
const {project_, workspace_, sourcer_, build} = runtime.project;

const _make = $_('make');

const t1 = workspace_({
  location: './out',
  tasks: [
    require('./project')
  ]});

const t = t1;
//m = attempt_ __, _make, 'test.js'
//console.log m
//t.broadcast m
t.run();
//console.log t
