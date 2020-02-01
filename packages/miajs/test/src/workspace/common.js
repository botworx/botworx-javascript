const common = require('../common');
for (let k in common) {
  const v = common[k];
  exports[k] = v;
}
