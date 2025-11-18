import fs from 'fs';

import * as esbuild from 'esbuild';

import type { ConnectSettings } from './connect';
import type {
  ParseResponsePayload, ParserExecutableMessages, SyntaxHighlightLanguage,
} from './parser.types';

const messages: ParserExecutableMessages = [];

const prepare = (content: string) => {
  return `var figma = require("figma");
  ${content
    .replace(/import.*figma.*/, '')
    .replace('var settings =', 'export default')
    .replace(/\s*export\s*{\s*settings\s*};?/s, '')
    .replace('example: `', 'example: figma.tsx`')
    .replace('example = `', 'example = figma.tsx`')}`;
};

const stdin = JSON.parse(fs.readFileSync(0, 'utf-8')) as { paths: string[] };
if (!stdin.paths.length) messages.push({ level: 'ERROR', message: 'No files found.' });

const docs = [];

for (const path of stdin.paths) {
  messages.push({ level: 'INFO', message: `\n-> Parsing ${path}` });
  const { settings }: { settings: ConnectSettings } = await import(path);

  const out = await esbuild.build({
    entryPoints: [path],
    outdir: './mappings',
    bundle: true,
    platform: 'neutral',
    write: false,
    external: ['./figma'],
  });

  docs.push({
    template: prepare(out.outputFiles[0].text),
    figmaNode: settings.url,
    component: '',
    source: 'string',
    language: 'typescript' as SyntaxHighlightLanguage,
    label: 'React',
    templateData: {
      nestable: true,
      props: {},
      imports: settings.imports ?? [],
    },
  });
}

const payload: ParseResponsePayload = {
  docs,
  messages,
};

process.stdout.write(JSON.stringify(payload));
