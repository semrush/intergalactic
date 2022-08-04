#!/usr/bin/env tsm

import yaml from 'yaml';
import { parse as parseCsv } from 'csv';
import { readFile, writeFile, rm as removeFile } from 'fs/promises';
import glob from 'fast-glob';
import { fileURLToPath } from 'url';
import { resolve as resolvePath, dirname as resolveParentPath } from 'path';

const dirname = resolvePath(fileURLToPath(import.meta.url), '..');
const crowdinConfigPath = resolvePath(dirname, '../crowdin.yml');
const crowdinConfig = (await yaml.parse(await readFile(crowdinConfigPath, 'utf-8'))) as {
  project_id: string;
  api_token_env: string;
  preserve_hierarchy: true;
  files: {
    source: `${string}.${'csv' | 'json'}`;
    first_line_contains_header?: boolean;
    scheme?: string;
    translation: `/%original_path%/%two_letters_code%.${'csv' | 'json'}`;
  }[];
};
const resources = crowdinConfig.files.filter(
  (file) => file.source.endsWith('.csv') && file.translation.endsWith('.csv'),
);
await Promise.all(
  resources.map(async ({ source, translation, scheme }) => {
    const dirPath = resolvePath(crowdinConfigPath, '..', resolveParentPath(source));
    if (!translation.startsWith('/%original_path%/%two_letters_code%')) {
      throw new Error(
        `Translation path "${translation}" is not currently supported in csv-2-json util`,
      );
    }
    const pattern = '*' + translation.substring('/%original_path%/%two_letters_code%'.length);
    const csvFiles = await glob(pattern, { cwd: dirPath });
    const csvFileContents = await Promise.all(
      csvFiles.map(
        (fileName) =>
          new Promise<{ identifier: string; source_phrase: string; translation: string }[]>(
            async (resolve, reject) => {
              const fileContent = await readFile(resolvePath(dirPath, fileName), 'utf-8');
              parseCsv(
                fileContent,
                { columns: scheme.split(','), delimiter: ',', fromLine: 2 },
                (err, records) => (err ? reject(err) : resolve(records)),
              );
            },
          ),
      ),
    );
    for (let i = 0; i < csvFiles.length; i++) {
      const inputName = csvFiles[i];
      const inputPath = resolvePath(dirPath, inputName);
      const withoutExtension = inputName.split('.').slice(0, -1).join('.');
      const outputPath = resolvePath(dirPath, withoutExtension + '.json');
      const outputContent: { [translationIdentifier: string]: string } = {};
      for (let { identifier, translation, source_phrase } of csvFileContents[i]) {
        outputContent[identifier] = translation || source_phrase;
      }
      await writeFile(outputPath, JSON.stringify(outputContent, null, 2) + '\n');
      if (!source.endsWith(inputName)) {
        await removeFile(inputPath);
      }
    }
  }),
);
