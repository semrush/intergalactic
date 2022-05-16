import { Storage } from '@google-cloud/storage';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
const filename = fileURLToPath(import.meta.url);

const log = (message: string) => {
  // eslint-disable-next-line no-console
  console.log(`[gcs-upload tool]: ${message}`);
};

const BUCKET_NAME = `ui-kit-flags`;

export const setupStorage = async () => {
  const configFilePath = path.join(path.dirname(filename), 'config.json');
  if (process.env.GCLOUD_SECRET) {
    log(`GCLOUD_SECRET env variable found, writing it's content to ${configFilePath}`);
    await fs.writeFile(configFilePath, process.env.GCLOUD_SECRET);
  }
  log(`Using config ${configFilePath}`);
  if (!(await fs.pathExists(configFilePath))) {
    const exampleFilePath = configFilePath.replace(/config\.json$/, 'config.example.json');
    throw new Error(
      `@semcore/gcs-upload package needs config.json to be defined in near to gss-upload's package.json file or GCLOUD_SECRET variable to be provided. Checkout ${exampleFilePath} to learn required file format.`,
    );
  }
  const config = await fs.readJson(configFilePath);
  const { project_id: projectId } = config;

  log(`Initiating storage for ${projectId} project`);

  const storage = new Storage({
    projectId,
    keyFilename: configFilePath,
  });

  log(`Initiated storage for ${projectId} project`);

  return storage;
};

export const getPackageData = async () => {
  const packageJsonFilePath = path.join(process.cwd(), 'package.json');
  if (!(await fs.pathExists(packageJsonFilePath))) {
    throw new Error(
      `@semcore/gcs-upload package requires package.json file to be located in your current working directory. Trying to find ${packageJsonFilePath}`,
    );
  }
  let { version, name } = await fs.readJson(packageJsonFilePath);
  if (!version || !name) {
    throw new Error(
      `@semcore/gcs-upload package requires local package.json file to contain fulfilled version and name fields. Failed to read them in ${packageJsonFilePath}`,
    );
  }
  name = name.replace('@semcore/', '');

  return { version, name };
};

export const upload = async (filePaths: string[]) => {
  if (!filePaths || !filePaths.length) {
    throw new Error(
      `@semcore/gcs-upload package requires at least one file path to be provided for uploading, got ${filePaths}`,
    );
  }

  const { version: packageVersion, name: packageName } = await getPackageData();

  const storage = await setupStorage();

  log(
    `Initiating uploading of ${filePaths.join(', ')} from ${packageName}@${packageVersion} package`,
  );

  await Promise.all(
    filePaths.map((filePath) => {
      const fileName = filePath.split('/').pop();
      const destination = `ui-kit/${packageName}/${packageVersion}/${fileName}`;

      log(`Uploading ${fileName} to ${destination}`);

      return (
        storage
          .bucket(BUCKET_NAME)
          .upload(filePath, {
            gzip: true,
            destination,
            metadata: {
              cacheControl: 'public, max-age=31536000',
            },
          })
          // eslint-disable-next-line no-console
          .then(() => console.log(`${fileName} uploaded to ${destination}`))
      );
    }),
  );
};

export const remove = async (filePaths: string[]) => {
  if (!filePaths || !filePaths.length) {
    throw new Error(
      `@semcore/gcs-upload package requires at least one file path to be provided for removing, got ${filePaths}`,
    );
  }

  const storage = await setupStorage();

  log(`Initiating removing of ${filePaths.join(', ')}`);

  await Promise.all(
    filePaths.map(async (filePath) => {
      log(`Removing ${filePath}`);

      await storage
        .bucket(BUCKET_NAME)
        .file(filePath)
        .delete()
        // eslint-disable-next-line no-console
        .then((file) => console.log(`gs://${BUCKET_NAME}/${file} removed`));
    }),
  );
};

export const ls = async () => {
  const storage = await setupStorage();

  log(`Listing files`);

  const [files] = await storage.bucket(BUCKET_NAME).getFiles();

  return files.map((file) => file.name);
};

export const uploadFilesInFolders = async (folderPaths: string[]) => {
  if (!folderPaths || !folderPaths.length) {
    throw new Error(
      `@semcore/gcs-upload package requires at least one folder path to be provided for uploading, got ${folderPaths}`,
    );
  }

  const storage = await setupStorage();

  log(`Uploading files from folders ${folderPaths.join(', ')}`);

  await Promise.all(
    folderPaths.map(async (folderPath) => {
      const folderName = folderPath.split('/').pop();
      const fileNames = await fs.readdir(folderPath);

      log(`Uploading files from folder ${folderPath}`);

      return await Promise.all(
        fileNames.map((fileName) => {
          const destination = `ui-kit/${folderName}/${fileName}`;

          log(`Uploading ${fileName} to ${destination}`);

          return (
            storage
              .bucket(BUCKET_NAME)
              .upload(`${folderName}/{${fileName}`, {
                gzip: true,
                destination,
                metadata: {
                  cacheControl: 'public, max-age=31536000',
                },
              })
              // eslint-disable-next-line no-console
              .then(() => console.log(`${folderName}/{${fileName} uploaded to ${destination}`))
          );
        }),
      );
    }),
  );
};
