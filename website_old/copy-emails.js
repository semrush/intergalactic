const path = require('path');
const fs = require('fs');

// copy files in DOCS (examples):
// from: semcore/email/.tmp/badge/examples/index.html
// top website/docs/product-emails/badge-email/examples/badge-index.html
(function () {
  const buildFolderName = '.tmp';
  const rootSourceTemplate = path.join(__dirname, `../semcore/email/${buildFolderName}`);

  function getDirectories(source) {
    return fs
      .readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  }

  function getPathFileInDocs(componentName, fileName) {
    return path.join(
      __dirname,
      'docs/product-emails/',
      `${componentName}-email`,
      'examples',
      `${componentName}-${fileName}.html`,
    );
  }

  function readAndWriteFilesInDocs(componentName) {
    const pathDirecoryExample = path.join(rootSourceTemplate, componentName, 'examples');
    if (!fs.existsSync(pathDirecoryExample)) return;
    fs.readdirSync(pathDirecoryExample).forEach((file) => {
      const fileName = file.replace(/.html/, '');
      const data = fs.readFileSync(path.join(pathDirecoryExample, file), { encoding: 'utf-8' });
      fs.writeFileSync(getPathFileInDocs(componentName, fileName), data);
    });
  }

  const components = getDirectories(rootSourceTemplate);
  components.forEach((componentName) => {
    readAndWriteFilesInDocs(componentName);
  });
})();
