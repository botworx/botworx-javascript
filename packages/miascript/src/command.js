/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const fs = require('fs');
const stream = require('stream');
const path = require('path');
const {compile} = require('./index');
const run = function() {
  let fileName = process.argv[2];
  const ext = path.extname(fileName);
  if (ext === '') {
    fileName += '.mia';
  }

  console.log("Compiling " + fileName);

  return fs.readFile(fileName, 'utf8', function(err, data) {
    if (err) {
      console.log("ERROR: ", err);
      return false;
    }
    //
    const code = compile(data, {filename: fileName});
    //
    const outFileName = fileName.substr(0, fileName.lastIndexOf(".")) + ".js";
    const out = fs.createWriteStream(outFileName);
    out.write(code);
    return out.end();
  });
};

exports.run = run;
