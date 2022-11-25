import fs from 'fs/promises';

const baseColors: { [colorName: string]: string } = JSON.parse(
  await fs.readFile('./style/base.json', 'utf-8'),
);

const values = {};
const types = {};
const descriptions = {};
const mixins: string[] = [];
type ColorPattern =
  | `{${string}.${string}}`
  | `{${string}.${string}}, ${number}`
  | `#${string}`
  | `{${string}.${string}}, ${number}`;
type DesignTokenNode =
  | {
      type: string;
      value:
        | string
        | { [subTokens: string]: `{${string}}` }
        | ColorPattern
        | `{${string}}`
        | `{${string}*${number}}`
        | `${ColorPattern}; ${ColorPattern}`;

      description?: string;
    }
  | DesignTokenTree;
type DesignTokenTree = { [childrenNodeName: string]: DesignTokenNode };
const traverse = (node: DesignTokenNode, pathParts: string[] = []) => {
  if ('type' in node) {
    const path = pathParts.join('-');
    types[path] = node.type;
    if (typeof node.value === 'object') {
      mixins.push(path);
      return;
    }
    values[path] = node.value;
    if (node.description) descriptions[path] = node.description;
    return;
  }
  for (const key in node) {
    traverse(node[key], [...pathParts, key]);
  }
};
traverse(JSON.parse(await fs.readFile('./style/tokens.json', 'utf-8')));
const resolveColor = (color: string) => {
  if (color.split(', ').length === 2) {
    const baseColor = resolveColor(color.split(', ')[0]);
    const [r, g, b] = (
      baseColor.length === 4
        ? [baseColor[1], baseColor[2], baseColor[3]]
        : [baseColor.substring(1, 3), baseColor.substring(3, 5), baseColor.substring(5, 7)]
    ).map((chunk) => parseInt(chunk, 16));
    const a = parseFloat(color.split(', ')[1]);

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  if (color.startsWith('{') && color.split('.').length === 2 && color.endsWith('}')) {
    const baseColorsName = color
      .substring(1, color.length - 1)
      .split('.')
      .join('-');
    const resolvedColor = baseColors[baseColorsName];
    if (!resolvedColor) {
      throw new Error(`Color ${baseColorsName} was not found in base palette`);
    }
    return resolvedColor;
  }
  if (color.startsWith('#')) {
    return color;
  }
  throw new Error(`Unable to process color ${color}`);
};
const resolveToken = (token: string) => {
  if (token.includes('*')) {
    return `calc(${token.split('*').map(resolveToken).join(' * ')})`;
  } else if (token.startsWith('{') && token.endsWith('}')) {
    const resolvedToken = values[token.substring(1, token.length - 1)];
    if (resolvedToken.startsWith('{')) {
      throw new Error(`On moment of resoling ${token}, ${resolvedToken} was not resolved yet`);
    }
    return resolvedToken;
  } else {
    return token;
  }
};

const producesTokens: { [token: string]: boolean } = {};
for (const token in values) {
  if (producesTokens[token]) continue;
  if (types[token] === 'color') {
    values[token] = resolveColor(values[token]);
  } else if (types[token] === 'boxShadow') {
    if (values[token].includes('; ')) {
      const list = values[token].split('; ');
      delete values[token];
      for (let i = 0; i < list.length; i++) {
        values[`${token}-${i + 1}`] = resolveColor(list[i]);
        types[`${token}-${i + 1}`] = types[token];
        descriptions[`${token}-${i + 1}`] = descriptions[token];
      }
      producesTokens[token] = true;
    } else {
      values[token] = resolveColor(values[token]);
    }
  } else if (types[token] === 'sizing' || types[token] === 'spacing') {
    values[token] = resolveToken(values[token]);
  }
}

const prefix = 'intergalactic';
const themeCssLines: string[] = [];
const themeJson = {};
themeCssLines.push(':root {');
for (const token in values) {
  if (descriptions[token]) themeCssLines.push(`  /* ${descriptions[token]} */`);
  const fullName = `--${prefix}-${types[token]}-${token}`;
  themeCssLines.push(`  ${fullName}: ${values[token]};`);
  themeJson[fullName] = values[token];
}
themeCssLines.push('}');

await fs.writeFile('./semcore/utils/src/themes/default.css', themeCssLines.join('\n'));
await fs.writeFile('./semcore/utils/src/themes/default.json', JSON.stringify(themeJson, null, 2));
