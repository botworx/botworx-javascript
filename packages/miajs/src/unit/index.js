for (let name of [
    'unit',
    'package',
    'testunit'
  ]) {
  const m = require('./' + name);
  exports[name] = m;
  Object.assign(exports, m);
}
