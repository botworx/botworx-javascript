const fs = require('fs');
const stream = require('stream');
const path = require('path');
const {compile} = require('./index');

defaults = {
  ast: true
}

const run = function(options=defaults) {
  let fileName = process.argv[2];
  const ext = path.extname(fileName);
  if (ext === '') {
    fileName += '.mia';
  }

  console.log("Compiling " + fileName);

  options.fileName = fileName

  fs.readFile(fileName, 'utf8', function(err, data) {
    if (err) {
      console.log("ERROR: ", err);
      return false;
    }
    //
    const code = compile(data, options);
    //
    const outFileName = fileName.substr(0, fileName.lastIndexOf(".")) + ".js";
    const out = fs.createWriteStream(outFileName);
    out.write(code);
    out.end();
  });
};

exports.run = run;
