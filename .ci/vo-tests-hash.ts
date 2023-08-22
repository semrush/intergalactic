#!/usr/bin/env tsm
const seed = 0;

/**
 * Generate hash of *.vo-test.ts files and it's dependencies (excluding node_modules) to
 * skip vo tests runs when no files changed
 */

import glob from 'fast-glob';
import esbuild from 'esbuild';
import { fastHashCode as hash } from 'fast-hash-code';
import fs from 'fs/promises';
import { esbuildPluginSemcoreSourcesResolve } from '../tools/esbuild-plugin-semcore/src/esbuild-plugin-semcore-sources-resolve';

export const generateVoTestsHash = async () => {
  const voTestFiles = await glob([
    'semcore/*/*.vo-test.ts',
    'semcore/*/*/*.vo-test.ts',
    'semcore/*/*/*/*.vo-test.ts',
  ]);
  const additionalFiles: string[] = [];

  await Promise.all(
    voTestFiles.map(async (filePath) => {
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("'../../../website/docs") && trimmed.endsWith("',")) {
          const relativePath = trimmed.substring("'../../../".length, trimmed.length - 2);
          if (relativePath.endsWith('.jsx') || relativePath.endsWith('.tsx')) {
            additionalFiles.push(relativePath);
          }
        }
      }
    }),
  );
  const inputFiles = [...voTestFiles, ...additionalFiles];
  const metas = await Promise.all(
    inputFiles.map((filePath) =>
      esbuild.build({
        entryPoints: [filePath],
        write: false,
        platform: 'node',
        bundle: true,
        metafile: true,
        logLevel: 'error',
        plugins: [esbuildPluginSemcoreSourcesResolve('.')],
        external: ['@semcore/testing-utils/e2e-stand', '@playwright/*', '*.png', '*.css'],
      }),
    ),
  );
  const usedFiles = [...inputFiles];
  for (const meta of metas) {
    if (!meta.metafile) continue;
    for (const inputFile in meta.metafile.inputs) {
      if (!inputFile.includes('node_modules')) {
        usedFiles.push(inputFile);
      }
    }
  }
  usedFiles.sort();

  const hashes = await Promise.all(
    usedFiles.map(async (filePath) => {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const hashed = hash(filePath + fileContent, { seed });
      return hashed;
    }),
  );

  return hash(hashes.join(','), { seed }).toString();
};
