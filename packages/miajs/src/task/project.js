/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const glob = require('glob');

const {Task, TS_FAILURE} = require('./task');
const {Runner} = require('./runner');

class Project extends Runner {
  constructor(action) {
    super(action);
  }
  add(child) {
    return super.add(child);
  }
    //child.project = this

  config(cfg) {
    for (let k in cfg) {
      const v = cfg[k];
      switch (k) {
        case 'tasks':
          for (let t of Array.from(v)) {
            this.add(t);
          }
          break;
        case 'rules':
          for (let r of Array.from(v)) {
            this.addRule(r);
          }
          break;
        default:
          this[k] = v;
      }
    }
    return this;
  }

  init() {
    super.init();
    for (let child of Array.from(this.tasks)) {
      this.schedule(child);
    }
    return this.status;
  }

  strategy(child) {
    this.remove(child);
    if(child.status === TS_FAILURE) {
      return this.fail();
    }
    //else
    return this.resume();
  }
}

exports.project_ = (cfg, action) => new Project(action).config(cfg);

class Workspace extends Project {
  constructor(action) {
    super(action);
  }
  add(child) {
    return super.add(child);
  }
}
    //child.workspace = this

exports.workspace_ = (cfg, action) => new Workspace(action).config(cfg);

class Sourcer extends Task {
  constructor(fn) {
    super();
    this.fn = fn;
  }
  init() {
    const options = {};
    const pattern = this.rnr.files;
    return glob(pattern, options, (er, sources) => {
      return Array.from(sources).map((src) =>
        this.fn(src));
    });
  }
}

exports.sourcer_ = fn => new Sourcer(fn);

const buildWorkspace = function(builders, cfg) {
  const product = new Workspace;
  for (let k in cfg) {
    const v = cfg[k];
    product[k] = build(builders, v);
  }
  return product;
};

const buildProject = function(builders, cfg) {
  const product = new Project;
  for (let k in cfg) {
    const v = cfg[k];
    product[k] = build(builders, v);
  }
  return product;
};

const buildTasks = function(builders, arr) {
  const product = [];
  for (let v of Array.from(arr)) {
    if (v instanceof Task) {
      product.push(v);
    } else {
      product.push(build(builders, v));
    }
  }
  return product;
};

const builders = {
  workspace: buildWorkspace,
  project: buildProject,
  tasks: buildTasks
};

var build = function(builders, cfg) {
  const product = {};
  for (let k in cfg) {
    const v = cfg[k];
    const builder = builders[k];
    if (builder) {
      product[k] = builder(builders, v);
    } else {
      product[k] = v;
    }
  }
  return product;
};

exports.build = build;
