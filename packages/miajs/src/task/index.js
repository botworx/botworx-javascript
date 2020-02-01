for (let name of [
    'policy',
    'task',
    'runner',
    'streamer',
    'project'
  ]) {
  const m = require('./' + name);
  exports[name] = m;
  /*
  console.log "module: #{name}"
  console.log JSON.stringify(m)
  */
  for (let k in m) {
    //console.log "key: #{k}, val: #{v}"
    const v = m[k];
    exports[k] = m[k];
  }
}
