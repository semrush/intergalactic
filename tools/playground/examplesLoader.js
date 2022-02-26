const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  const returnValue = [];
  let filepath;
  let subFiles;
  for (let i = 0, len = files.length; i < len; ++i) {
    if (files[i].charAt(0) !== '.' && /\.tsx$/.test(files[i])) {
      filepath = path.resolve(path.join(dir, files[i]));
      if (fs.lstatSync(filepath).isDirectory()) {
        subFiles = scanDir(path.join(dir, files[i]));
        returnValue.push.apply(returnValue, subFiles);
      } else {
        returnValue.push({
          file: path.join(dir, files[i]),
          filepath: filepath,
        });
      }
    }
  }
  return returnValue;
}

module.exports = function (source) {
  const files = scanDir(path.join(__dirname, 'examples'));
  let file;

  source = 'let data = {};\n';
  for (let i = 0, len = files.length; i < len; ++i) {
    file = files[i];
    const filename = file.file.replace(__dirname, '').replace(/\.(js|tsx)$/, '');
    const key = filename.replace(/[\/\-]/g, '_');
    source += `
      try {
        const ${key} = require(".${filename}");
        data["${filename}"] = ${key};
      } catch(e) {
        console.warn(e)
      }
    `;
  }
  source += 'module.exports = data;';

  return source;
};
