import axios from 'axios';
import { createWriteStream } from 'fs';
import fs from 'fs-extra';
import compressing from 'compressing';
import { log } from './utils';

const downloadFile = async (fileUrl: string, outputPath: string) => {
  const writer = createWriteStream(outputPath);

  return axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then((response) => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error: Error | null = null;
      writer.on('error', (err) => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(true);
        }
      });
    });
  });
};

export const downloadTarballs = async (urls: string[]): Promise<string[]> => {
  log('Downloading tarballs...');
  await fs.emptyDir('.tmp/prerelease');
  await fs.ensureDir('.tmp/prerelease/tarballs');
  const paths = await Promise.all(
    urls.map(async (url) => {
      const fileName = url.split('/')[url.split('/').length - 1];
      const path = `.tmp/prerelease/tarballs/${fileName}`;

      await downloadFile(url, path);

      return path;
    }),
  );
  log('All tarballs are downloaded.');

  return paths;
};
