let miajs;
exports.miajs = (miajs = require('@botworx/miajs'));
Object.assign(exports, miajs);
for (let name of [
    'transformer',
    'analyzer',
    'yy',
    'grammar',
    'miacompiler',
    'mialexer',
    'miaparser',
    'visitor',
    'miascript'
  ]) {
    const m = require('./' + name);
    exports[name] = m;
    Object.assign(exports, m);
}
