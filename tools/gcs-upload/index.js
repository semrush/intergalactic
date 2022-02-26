const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');
const BUCKET_NAME = `ui-kit-flags`;

function connect() {
  const confFilePath = path.join(__dirname, 'config.json');
  if (process.env.GCLOUD_SECRET) {
    fs.writeFileSync(confFilePath, process.env.GCLOUD_SECRET);
  }
  const { projectId } = require(confFilePath);
  return new Storage({
    projectId,
    keyFilename: confFilePath,
  });
}

function getPackageData() {
  let { version, name } = require(path.join(process.cwd(), 'package.json'));
  if (!version || !name) {
    throw new Error('Cant upload files to GCS, package.json of package doesnt exist');
  }
  name = name.replace('@semcore/', '');
  return { version, name };
}

/**
 * Ф-ция загрузки файлов в gcs.
 * Считывает версию и имя пакета из package.json в директории из которой запущена,
 * складывает все файлы из files по пути `ui-kit/имя_пакета/версия_пакета/имя_файла.расширение_файла`
 * @param {String[]} files - список путей до фалов, которые нужно залить на gcs
 */
function upload(files) {
  if (!files || !files.length) throw new Error('Gcs-upload failed to tun. No files specified');

  const { version, name } = getPackageData();
  const storage = connect();

  files.forEach((file) => {
    const split = file.split('/');
    const fileName = split[split.length - 1];
    const destination = `ui-kit/${name}/${version}/${fileName}`;
    console.log(files);
    storage
      .bucket(BUCKET_NAME)
      .upload(file, {
        gzip: true,
        destination,
        metadata: {
          cacheControl: 'public, max-age=31536000',
        },
      })
      .then(() => console.log(`${fileName} uploaded to ${destination}`))
      .catch((err) => {
        throw err;
      });
  });
}

/**
 * Ф-ция удаления файлов из gcs.
 * Удаляет все файлы по путям из аргументов.
 * ВАЖНО: gscFilesPaths должны содержать пути к файлам внутри бакета.
 * @param {String[]} gscFilesPaths -
 */
function remove(gscFilesPaths) {
  const storage = connect();

  gscFilesPaths.forEach((path) => {
    storage
      .bucket(BUCKET_NAME)
      .file(path)
      .delete()
      .then(
        (file) => console.log(`gs://${BUCKET_NAME}/${file} deleted.`),
        (err) => console.error(`Failed to delete file ${path}\n`, err),
      );
  });
}

/**
 * Ф-ция просмотра списка фалов в бакете
 */
function ls() {
  const storage = connect();
  storage
    .bucket(BUCKET_NAME)
    .getFiles()
    .then(
      ([files]) => {
        console.log('Files:');
        files.forEach((file) => {
          console.log(file.name);
        });
      },
      (err) => console.error(`Failed to list files\n`, err),
    );
}

function uploadFilesInFolders(pathFolders) {
  if (!pathFolders || !pathFolders.length)
    throw new Error('Gcs-upload failed to tun. No files specified');
  pathFolders.forEach((pathFolder) => {
    const split = pathFolder.split('/');
    const folderName = split[split.length - 1];
    const files = fs.readdirSync(pathFolder);

    files.forEach((fileName) => {
      const destination = `ui-kit/${folderName}/${fileName}`;
      const storage = connect();

      storage
        .bucket(BUCKET_NAME)
        .upload(`${pathFolder}/${fileName}`, {
          gzip: true,
          destination,
          metadata: {
            cacheControl: 'public, max-age=31536000',
          },
        })
        .then(
          () => console.log(`${fileName} uploaded to ${destination}`),
          (err) => console.error(`Failed to upload ${fileName}.\n`, err),
        );
    });
  });
}

module.exports = {
  upload,
  remove,
  ls,
  uploadFilesInFolders,
};
