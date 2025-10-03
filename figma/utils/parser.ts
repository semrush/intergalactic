import fs from 'fs';

import type {
  ParseResponsePayload, ParserExecutableMessages, SyntaxHighlightLanguage,
} from './parser.types';

const messages: ParserExecutableMessages = [];

const readFile = (filePath: string) => {
  messages.push({ level: 'INFO', message: `\n-> Parsing ${filePath}` });

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const templateLines = fileContent.split('\n');

  let figmaNode = '';
  let component = '';
  const imports: string[] = [];
  let i = 0;

  while (!templateLines[i].includes('require(\'figma\')')) {
    const line = templateLines[i];

    if (line.match(/^\/\/\s*url|^\/\/\s*https/))
      figmaNode = line.replace(/\/\/\s*(url)?:?/, '').trim();

    if (line.match(/^\/\/\s*component/))
      component = line.replace(/\/\/\s*component:?/, '').trim();

    if (line.match(/^\/\/\s*import/))
      imports.push(line.replace(/^\/\//, '').trim());

    i++;
  }

  if (figmaNode === '') {
    messages.push({
      level: 'WARN',
      message: 'Didn\'t find the node URL, skipping file.',
    });
    return;
  }

  const template = templateLines.slice(i).join('\n');

  return {
    figmaNode,
    component,
    source: 'string',
    template,
    templateData: {
      nestable: true,
      props: {},
      imports,
    },
    language: 'typescript' as SyntaxHighlightLanguage,
    label: 'React',
  };
};

const stdin = JSON.parse(fs.readFileSync(0, 'utf-8')) as { paths: string[] };
if (!stdin.paths.length) messages.push({ level: 'ERROR', message: 'No files found.' });

const docs = stdin.paths.map((path) => readFile(path)).filter((item) => item !== undefined);

const payload: ParseResponsePayload = {
  docs,
  messages,
};

process.stdout.write(JSON.stringify(payload));
