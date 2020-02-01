/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {runtime} = require('../common');
const {task_, chain_, Runner, Task} = runtime;
const {ReadFile, ConsoleWriter} = runtime.streamer;
const {project_, workspace_, sourcer_, build} = runtime.project;

module.exports =
  project_({
    files: '*.txt',
    tasks: [
      sourcer_(function(src) {
        h2(src);
        return this.spawn(chain_(function() {
          return this.chain(new ReadFile(src))
          .chain(new ConsoleWriter);
        })
        );
      })
    ]});
