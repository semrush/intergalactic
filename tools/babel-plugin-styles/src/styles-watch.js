const chokidar = require('chokidar');
const fs = require('fs-extra');

const watchFile = JSON.parse(process.argv[2]);

chokidar.watch(Object.keys(watchFile)).on('change', (p) => {
  fs.writeFileSync(watchFile[p], fs.readFileSync(watchFile[p]));
});
