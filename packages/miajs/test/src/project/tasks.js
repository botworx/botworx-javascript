/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {runtime} = require('./common');
const {task_, chain_, Runner, Task} = runtime;
const {ReadFile, ConsoleWriter} = runtime.streamer;
const {project_, workspace_, sourcer_, build} = runtime.project;

const t1 = workspace_({
  tasks: [
    project_({
      files: '*.txt',
      tasks: [
        task_(() => $$.h2('hello'))
      ]})
  ]});

const t2 = workspace_({
  tasks: [
    project_({
      files: '*.txt',
      tasks: [
        sourcer_(src => $$.h2(src))
      ]})
  ]});

const t3 = workspace_({
  tasks: [
    project_({
      files: '*.txt',
      tasks: [
        sourcer_(function(src) {
          $$.h2(src);
          return this.spawn(() => console.log('hello'));
        })
      ]})
  ]});

const t4 = workspace_({
  tasks: [
    project_({
      files: '*.txt',
      tasks: [
        sourcer_(function(src) {
          $$.h2(src);
          return this.spawn(chain_(function() {
            return this.chain(new ReadFile(src))
            .chain(new ConsoleWriter);
          })
          );
        })
      ]})
  ]});

//rnr = new Runner()
//rnr.run(t1)
const t = t4;
console.log(t);
t.run();
