import fs from 'fs/promises';
import glob from 'fast-glob';
import postcss from 'postcss';
import valuesParser from 'postcss-value-parser';

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
    if (values[path]) {
      throw new Error(`Duplicated design token "${path}"`);
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
  if (color.startsWith('rgba(') && color.endsWith(')')) {
    const lastComa = color.lastIndexOf(',');
    const alpha = parseFloat(color.substring(lastComa + 1, color.length - 1));
    if (Number.isNaN(alpha)) {
      throw new Error(`Unable to parse rgba of ${color}`);
    }
    let resolvedColor = color.substring('rgba('.length, lastComa);
    if (resolvedColor.startsWith('{')) resolvedColor = resolveColor(resolvedColor);
    if (resolvedColor.startsWith('#')) {
      if (resolvedColor.length === 1 + 3) {
        resolvedColor = [resolvedColor[1], resolvedColor[2], resolvedColor[3]]
          .map((hex) => parseInt(hex, 16))
          .join(', ');
      } else if (resolvedColor.length === 1 + 6) {
        resolvedColor = [
          resolvedColor.substring(1, 3),
          resolvedColor.substring(3, 5),
          resolvedColor.substring(5, 7),
        ]
          .map((hex) => parseInt(hex, 16))
          .join(', ');
      } else {
        throw new Error(
          `Unable to convert hex ${resolveColor} to rgb list of colors (processing ${color})`,
        );
      }
    }

    if (!resolvedColor || resolvedColor.split(',').length !== 3) {
      throw new Error(`Unable to produce rgba of ${color} (input format is not supported yet)`);
    }

    return `rgba(${resolvedColor}, ${alpha})`;
  }
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
    const [value, factor] = token.split('*');
    const resolvedValue = resolveToken(value);
    if (!resolvedValue.endsWith('px')) {
      throw new Error(`Unsupported expression ${token}`);
    }
    return `${parseFloat(resolvedValue) * parseFloat(factor)}px`;
  } else if (token.startsWith('{') && token.endsWith('}')) {
    const resolvedToken = values[token.substring(1, token.length - 1)];
    if (!resolvedToken || resolvedToken.startsWith('{')) {
      throw new Error(`On moment of resolving ${token}, ${resolvedToken} was not resolved yet`);
    }
    return resolvedToken;
  } else {
    return token;
  }
};
const replaceColors = (str: string) => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (str.substring(i, i + 'rgba('.length) === 'rgba(') {
      const start = i;
      while (str[i] !== undefined && str[i] !== ')') i++;
      i++;
      const end = i;
      result += resolveColor(str.substring(start, end));
    } else {
      result += str[i];
    }
  }

  return result;
};

for (const token in values) {
  if (types[token] === 'color') {
    values[token] = resolveColor(values[token]);
  } else if (types[token] === 'boxShadow') {
    values[token] = values[token].split('; ').map(replaceColors).join(', ');
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
  const fullName = `--${prefix}-${token}`;
  themeCssLines.push(`  ${fullName}: ${values[token]};`);
  themeJson[fullName] = values[token];
}
themeCssLines.push('}');

await fs.writeFile('./semcore/utils/src/themes/default.css', themeCssLines.join('\n'));
await fs.writeFile('./semcore/utils/src/themes/default.json', JSON.stringify(themeJson, null, 2));

const projectCssPaths = (
  await glob('./semcore/*/src/**/*.shadow.css', {
    ignore: ['node_modules', 'lib'],
  })
).filter((path) => {
  if (
    path
      .split('/')
      .some((pathPart) => ['chart', 'd3-chart', 'email', 'tag', 'table'].includes(pathPart))
  ) {
    return false;
  }
  return true;
});

const projectCssContents = await Promise.all(
  projectCssPaths.map((path) => fs.readFile(path, 'utf-8')),
);

const usedVariables = {};

const legacyCssVariablesFile = await fs.readFile('./semcore/utils/style/var.css', 'utf-8');
const legacyCssVariablesList = legacyCssVariablesFile
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line.startsWith('--') && line.includes(':'))
  .map((line) => line.substring(0, line.indexOf(':')));
const legacyCssVariables = Object.fromEntries(
  legacyCssVariablesList.map((variableName) => [variableName, 0]),
);

const processedCss = await Promise.all(
  projectCssContents.map((cssContent) =>
    postcss([
      {
        postcssPlugin: 'variables-explored',
        prepare: (result) => {
          const traverseAst = (nodes) => {
            for (const node of nodes) {
              if (node.nodes) {
                traverseAst(node.nodes);
              }
              if (node.value) {
                const valueAst = valuesParser(node.value);
                const traverseValueAst = (nodes) => {
                  for (const valueNode of nodes) {
                    if (valueNode.nodes) traverseValueAst(valueNode.nodes);
                    if (valueNode.type !== 'function' || valueNode.value !== 'var') continue;
                    const variableName = valueNode.nodes[0].value;
                    if (!variableName.startsWith(`--${prefix}`)) {
                      if (legacyCssVariables[variableName] !== undefined) {
                        legacyCssVariables[variableName]++;
                      }
                      continue;
                    }
                    const hasDefault = valueNode.nodes.length === 3;
                    if (!hasDefault) {
                      valueNode.nodes.push(
                        {
                          type: 'div',
                          sourceIndex: -1,
                          value: ',',
                          before: '',
                          after: ' ',
                        },
                        {
                          type: 'word',
                          sourceIndex: -1,
                          value: '',
                        },
                      );
                    }
                    const withoutPrefix = variableName.substring(`--${prefix}-`.length);
                    usedVariables[withoutPrefix] = true;
                    if (!values[withoutPrefix]) {
                      throw new Error(
                        `Variable ${variableName} is used in project but not presented in design tokens list`,
                      );
                    }
                    valueNode.nodes[2].type = 'word';
                    valueNode.nodes[2].value = values[withoutPrefix];
                    valueNode.nodes[2].nodes = [];
                    valueNode.nodes.length = 3;
                  }
                };
                traverseValueAst(valueAst.nodes);
                node.value = valueAst.toString();
              }
            }
          };
          traverseAst(result.root.nodes);
          return {};
        },
      },
    ]).process(cssContent),
  ),
);
await Promise.all(
  projectCssPaths.map((path, index) => fs.writeFile(path, processedCss[index].css)),
);

const unusedVariables: string[] = [];
for (const variable in values) {
  if (!usedVariables[variable]) {
    unusedVariables.push(variable);
  }
}

/* eslint-disable no-console */
if (unusedVariables.length > 0) {
  console.log(`Unused design tokens:`);
  console.log(unusedVariables.join('\n'));
}
if (Object.values(legacyCssVariables).reduce((sum, item) => sum + item) > 0) {
  console.log(`Still used legacy variables:`);
  for (const variable in legacyCssVariables) {
    if (legacyCssVariables[variable] !== 0) {
      console.log(`${variable} (${legacyCssVariables[variable]})`);
    }
  }
}
