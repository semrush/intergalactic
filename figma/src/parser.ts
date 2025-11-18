import fs from 'fs';

import * as esbuild from 'esbuild';

import type {
  ParseResponsePayload, ParserExecutableMessages, SyntaxHighlightLanguage,
} from './parser.types';

const messages: ParserExecutableMessages = [];

const prepare = (content: string) => {
  const url = content.match(/url: ['"](.+)['"]/);
  if (!url) return null;
  const importsStr = content.match(/imports: (\[.*\])/s);
  const imports = importsStr ? JSON.parse(importsStr[1]) : [];
  messages.push({ level: 'INFO', message: url[1] });
  return {
    imports,
    figmaNode: url[1],
    template: `var figma = require('figma')
      ${content
        .replace('connect.settings =', 'export default')
        .replace('import { figma } from "./figma";', '')
        .replace('example: `', 'example: figma.tsx`')}`,
  };
};

const parse = async (entryPoints: string[]) => {
  messages.push({ level: 'INFO', message: `\n-> Parsing ${entryPoints}` });

  const out = await esbuild.build({
    entryPoints,
    outdir: 'utils/maptest',
    bundle: true,
    platform: 'neutral',
    write: false,
    external: ['./figma'],
  });

  const templates = out.outputFiles.map((file) => prepare(file.text)).filter((res) => res != null);

  return templates.map((template) => {
    return {
      template: template.template,
      figmaNode: template.figmaNode,
      component: '',
      source: 'string',
      templateData: {
        nestable: true,
        props: {},
        imports: template.imports,
      },
      language: 'typescript' as SyntaxHighlightLanguage,
      label: 'React',
    };
  });
};

const stdin = JSON.parse(fs.readFileSync(0, 'utf-8')) as { paths: string[] };
if (!stdin.paths.length) messages.push({ level: 'ERROR', message: 'No files found.' });

const docs = await parse(stdin.paths);

const payload: ParseResponsePayload = {
  docs,
  messages,
};

process.stdout.write(JSON.stringify(payload));
