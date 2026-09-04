import fs from 'fs';

import type {
  ParseResponsePayload, ParserExecutableMessage, CodeConnectDoc,
} from './parser.types';

const messages: ParserExecutableMessage[] = [];

const readFile = (filePath: string) => {
  messages.push({ level: 'INFO', message: `\n-> Parsing ${filePath}` });

  let template = fs.readFileSync(filePath, 'utf-8');
  const templateStrings = template.split('\n');

  let figmaNode = '';
  let component = '';
  const imports: string[] = [];
  let i = 0;

  // parsing metadata
  while (!templateStrings[i].includes('require(\'figma\')')) {
    let line = templateStrings[i];

    if (line.startsWith('//')) {
      line = line.substring(2).trim();

      const url = line.match(/https:\/\/.+/);
      if (url)
        figmaNode = url[0];

      const componentMatch = line.match(/^component:*\s*(.+)/);
      if (componentMatch)
        component = componentMatch[1];

      if (line.startsWith('import'))
        imports.push(line);
    }
    i++;
  }

  if (figmaNode === '') {
    messages.push({
      level: 'WARN',
      message: 'Didn\'t find the node URL, skipping file.',
    });
    return;
  }

  // custom functions
  const injectable = `
  const layerArrayCode = (array, wrapper) => {
    let code;
    array.forEach((child) => code = figma.tsx\`\${code}\${child.type === 'INSTANCE' ? child.executeTemplate().example : child.textContent}\`);
    if (wrapper && code) code = figma.tsx\`<\${wrapper}>\${code}</\${wrapper}>\`;
    return code;
  };
  const instanceCode = (instance, layerName) => {
    if (instance.findInstance(layerName).type === 'INSTANCE')
      return instance.findInstance(layerName).executeTemplate().example;
    return undefined;
  }
  `;
  template = [templateStrings[i], injectable, ...templateStrings.slice(i + 1)].join('\n');

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
    language: 'typescript',
    label: 'React',
  } as CodeConnectDoc;
};

const stdin = JSON.parse(fs.readFileSync(0, 'utf-8')) as { paths: string[] };
if (!stdin.paths.length) messages.push({ level: 'ERROR', message: 'No files found.' });

const docs = stdin.paths.map((path) => readFile(path)).filter((item) => item !== undefined);

const payload: ParseResponsePayload = {
  docs,
  messages,
};

process.stdout.write(JSON.stringify(payload));
