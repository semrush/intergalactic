import { Storage } from '@google-cloud/storage';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import pLimit from 'p-limit';

const filename = fileURLToPath(import.meta.url);

const log = (message: string) => {
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log(`[gcs-upload tool]: ${message}`);
};

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

export const upload = async (
  bucketName: string,
  filePaths: string[],
  {
    uploadSrcBaseDir,
    destinationSubDir,
  }: { uploadSrcBaseDir?: string; destinationSubDir?: string } = {},
) => {
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

  const limit = pLimit(50);

  await Promise.all(
    filePaths.map((filePath) =>
      limit(() => {
        const fileName = uploadSrcBaseDir
          ? path.relative(uploadSrcBaseDir, filePath)
          : filePath.split('/').pop();
        const destination = [packageVersion, destinationSubDir, fileName]
          .filter((part) => part !== undefined)
          .join('/');

        log(`Uploading ${destination} from ${filePath}`);

        return (
          storage
            .bucket(bucketName)
            .upload(filePath, {
              gzip: true,
              destination,
              metadata: {
                cacheControl: 'public, max-age=31536000',
              },
            })
            // biome-ignore lint/suspicious/noConsoleLog:
            .then(() => console.log(`${fileName} uploaded to ${destination}`))
        );
      }),
    ),
  );
};
