const fs = require('fs');
const stream = require('stream');
const path = require('path');
const {defaults, compile} = require('./index');

const run = function(options=defaults) {
  let filename = process.argv[2];
  const ext = path.extname(filename);
  if (ext === '') {
    filename += '.mia';
  }

  console.log("Compiling " + filename);

  options.filename = filename

  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      console.log("ERROR: ", err);
      return false;
    }
    //
    const code = compile(data, options);
    //
    const outFileName = filename.substr(0, filename.lastIndexOf(".")) + ".js";
    const out = fs.createWriteStream(outFileName);
    out.write(code);
    out.end();
  });
};

exports.run = run;
