import fs from 'fs';

import type {
  ParseResponsePayload, ParserExecutableMessages, SyntaxHighlightLanguage,
} from './parser.types';

const messages: ParserExecutableMessages = [];

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

  // parsing custom functions
  const replacements = [
    {
      // instance.instanceCode(layerName: string)
      regex: /(?<objName>\w+)\.instanceCode\(('(?<layerName1>[^']*)'|"(?<layerName2>[^"]*)")\)/g,
      replacer: (...args: any) => {
        const { objName, layerName1, layerName2 } = args.at(-1) as { objName: string; layerName1?: string; layerName2?: string };
        return `${objName}.findInstance('${layerName1 || layerName2}').type === 'INSTANCE' ? ${objName}.findInstance('${layerName1 || layerName2}').executeTemplate().example : undefined`;
      },
    },
    {
      // layerArrayCode(array: instance[], wrapperName?: string)
      regex: /[\w.]*layerArrayCode\((?<arrayName>\w*)(,\s*(['"](?<wrapperName>[^'"]*)['"]))?\)/g,
      replacer: (...args: any) => {
        const { arrayName, wrapperName } = args.at(-1) as { arrayName: string; wrapperName?: string };
        let result = `let code; ` + arrayName + '.forEach((child) => code = figma.tsx`${code}${child.type === "INSTANCE" ? child.executeTemplate().example : child.textContent}`);';
        if (wrapperName) result += 'if (code) code = figma.tsx`<' + wrapperName + '>${code}</' + wrapperName + '>`;';
        result = '(() => {' + result + ' return code; })()';
        return result;
      },
    },
  ];

  replacements.forEach((r) => template = template.replace(r.regex, r.replacer));

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
