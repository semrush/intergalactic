import fs from 'node:fs/promises';
import { resolve as resolvePath, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// @ts-ignore
import { transformAsync as babelTransform } from '@babel/core';
import * as cheerio from 'cheerio';
import { glob } from 'glob';
import { Parser } from 'html-to-react';

import packageJson from './package.json';

const __dirname = resolvePath(fileURLToPath(import.meta.url), '..');
const parser = Parser();

const babelConfig = {
  presets: ['@babel/preset-react', ['@babel/preset-env', { modules: 'cjs' }]],
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime', '@compiled/babel-plugin'],
};

transform();

async function transform() {
  const icons = await glob(`${__dirname.replaceAll(/\\/g, '/')}/svg/**/*svg`);

  const exports = {
    '.': {
      types: `./lib/types/index.d.ts`,
      import: `./lib/esm/index.mjs`,
      require: `./lib/cjs/index.js`,
    },
  };

  for (const icon of icons) {
    const [type, name, iconName] = icon.slice(__dirname.length + 1 + 'svg'.length + 1).split(sep);
    const group = iconName.length === 5 && (iconName[0] === 'm' || iconName[0] === 'l') ? iconName[0] : '';
    const svg = await fs.readFile(icon, 'utf8');

    const iconSourceCjs = await transformSvg(svg, { type, name, group, buildType: 'cjs' });
    const iconSourceEsm = await transformSvg(svg, { type, name, group, buildType: 'esm' });

    const cjs = await babelTransform(iconSourceCjs, babelConfig);
    const esm = await babelTransform(iconSourceEsm, { presets: ['@babel/preset-react'], plugins: ['@compiled/babel-plugin'] });

    const writePath = resolvePath(__dirname, 'lib', type === 'icon' ? '' : type, name, group, 'index.js');
    const writeBasePath = dirname(writePath);

    await fs.mkdir(writeBasePath, { recursive: true });

    const dts = `
import type { IconComponent } from '../..${(type === 'pay' || type === 'color') ? '/../' : '/'}types';
declare const Icon: IconComponent;
export default Icon;
    `;

    await fs.writeFile(writePath, cjs.code, { encoding: 'utf8' });
    await fs.writeFile(writePath.replace('.js', '.mjs'), esm.code, { encoding: 'utf8' });
    await fs.writeFile(writePath.replace('.js', '.d.ts'), dts, { encoding: 'utf8' });

    const exportName = [type === 'icon' ? undefined : type, name, group].filter(Boolean).join('/');

    // @ts-ignore
    exports[`./${exportName}`] = {
      types: `./lib/${exportName}/index.d.ts`,
      import: `./lib/${exportName}/index.mjs`,
      require: `./lib/${exportName}/index.js`,
    };
  }

  // @ts-ignore
  packageJson.exports = Object.fromEntries(Object.entries(exports).sort((a, b) => a[0].localeCompare(b[0])));
  await fs.writeFile(resolvePath(__dirname, 'package.json'), JSON.stringify(packageJson, undefined, 2));
}

async function transformSvg(svg: string, opts: { type: string; name: string; group: string; buildType: 'cjs' | 'esm' }) {
  const { type, name, group, buildType } = opts;
  const $ = cheerio.load(svg, { xmlMode: true });
  const $svg = $('svg');
  if ($svg.attr('viewBox') === undefined) {
    throw new Error(`Icon "${name}" hasn't viewBox attribute`);
  }

  patchLinearGradient($svg, name, group);
  patchClipPath($svg, name, group);

  $svg.find('path').attr('shape-rendering', 'geometricPrecision');
  const iconSvg = convertJsxToString(`<svg>${$svg.html()}</svg>`);
  const sourceSvg = iconSvg.replace(/<(\/)?svg>(\n)?/g, '');
  const width = $svg.attr('width');
  const height = $svg.attr('height');
  const viewBox = $svg.attr('viewBox');

  return `
import React from 'react';
import { createBaseComponent } from '@semcore/core';
import Icon from '../..${(type === 'pay' || type === 'color') ? '/../' : '/'}${buildType === 'esm' ? 'esm/index.mjs' : 'cjs/index.js'}';

function Root${name}({
  width = '${width}',
  height = '${height}',
  viewBox = '${viewBox}',
  ...props
}, ref) {
  return (
      <Icon
        ref={ref}
        data-name="${name}"
        data-ui-name="${name}"
        data-group="${group}"
        width={width}
        height={height}
        viewBox={viewBox}
        {...props}
      >
          ${sourceSvg}
      </Icon>
    );
}

Root${name}.displayName = '${name}'

const ${name} = createBaseComponent(Root${name}, { isIcon: true })

export {
  ${name} as default
}
`;
}

function makeId(idLetter: string, name: string, group: string) {
  const version = packageJson.version;

  return `intergalactic-icon-${name}_${group}_${idLetter}-${version}`;
}

function patchSvg($svg: any, fromElement: string, toElement: string, name: string, group: string) {
  let shouldPatchId = false;

  $svg.find(fromElement).each(function () {
    // @ts-ignore
    const fillData = this.attribs.fill;

    if (fillData) {
      const match = fillData.match(/^url\(#([a-z0-9])+\)$/);

      if (match && match.length > 1 && match[1]) {
        const idLetter = match[1];
        // @ts-ignore
        this.attribs.fill = `url(#${makeId(idLetter, name, group)})`;

        shouldPatchId = true;
      }
    }
  });

  if (shouldPatchId) {
    $svg.find(toElement).each(function () {
      // @ts-ignore
      const idLetter = this.attribs.id;
      // @ts-ignore
      this.attribs.id = makeId(idLetter, name, group);
    });
  }
}

function patchLinearGradient($svg: any, name: string, group: string) {
  patchSvg($svg, 'path', 'linearGradient', name, group);
}

function patchClipPath($svg: any, name: string, group: string) {
  patchSvg($svg, 'g', 'clipPath', name, group);
}

function convertJsxToString(htmlText: string) {
  const stringifyJsx: (reactElement: any) => string = (reactElement) => {
    if (!reactElement) {
      return '';
    }
    if (Array.isArray(reactElement)) {
      return reactElement.map(stringifyJsx).join('');
    }
    if (typeof reactElement === 'string') {
      return reactElement;
    }
    if (reactElement.children) {
      return stringifyJsx(reactElement.children);
    }
    const { type, props } = reactElement;
    // @ts-ignore
    const tagName = SVG_ELEMENT_TAG_NAMES[type] ?? type;
    const { children, ...otherProps } = props;
    let attributes = Object.entries(otherProps)
      .map(([key, value]) => (value === true ? key : `${key}="${value}"`))
      .join(' ');
    if (attributes) {
      attributes = ` ${attributes}`;
    }
    return `<${tagName}${attributes}>${stringifyJsx(children)}</${tagName}>`;
  };

  const jsxModel = parser.parse(htmlText);
  return stringifyJsx(jsxModel);
}

// Source: https://developer.mozilla.org/en-US/docs/Web/SVG/Element#SVG_elements
const SVG_ELEMENT_TAG_NAMES = {
  'animatemotion': 'animateMotion',
  'animatetransform': 'animateTransform',
  'clippath': 'clipPath',
  'color-profile': 'colorProfile',
  'feblend': 'feBlend',
  'fecolormatrix': 'feColorMatrix',
  'fecomponenttransfer': 'feComponentTransfer',
  'fecomposite': 'feComposite',
  'feconvolvematrix': 'feConvolveMatrix',
  'fediffuselighting': 'feDiffuseLighting',
  'fedisplacementmap': 'feDisplacementMap',
  'fedistantlight': 'feDistantLight',
  'fedropshadow': 'feDropShadow',
  'feflood': 'feFlood',
  'fefunca': 'feFuncA',
  'fefuncb': 'feFuncB',
  'fefuncg': 'feFuncG',
  'fefuncr': 'feFuncR',
  'fegaussianblur': 'feGaussianBlur',
  'feimage': 'feImage',
  'femerge': 'feMerge',
  'femergenode': 'feMergeNode',
  'femorphology': 'feMorphology',
  'feoffset': 'feOffset',
  'fepointlight': 'fePointLight',
  'fespecularlighting': 'feSpecularLighting',
  'fespotlight': 'feSpotLight',
  'fetile': 'feTile',
  'feturbulence': 'feTurbulence',
  'foreignobject': 'foreignObject',
  'lineargradient': 'linearGradient',
  'radialgradient': 'radialGradient',
  'textpath': 'textPath',
};
