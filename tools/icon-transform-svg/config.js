// Source: https://developer.mozilla.org/en-US/docs/Web/SVG/Element#SVG_elements
const svgElementTagNames = {
  animatemotion: 'animateMotion',
  animatetransform: 'animateTransform',
  clippath: 'clipPath',
  'color-profile': 'colorProfile',
  feblend: 'feBlend',
  fecolormatrix: 'feColorMatrix',
  fecomponenttransfer: 'feComponentTransfer',
  fecomposite: 'feComposite',
  feconvolvematrix: 'feConvolveMatrix',
  fediffuselighting: 'feDiffuseLighting',
  fedisplacementmap: 'feDisplacementMap',
  fedistantlight: 'feDistantLight',
  fedropshadow: 'feDropShadow',
  feflood: 'feFlood',
  fefunca: 'feFuncA',
  fefuncb: 'feFuncB',
  fefuncg: 'feFuncG',
  fefuncr: 'feFuncR',
  fegaussianblur: 'feGaussianBlur',
  feimage: 'feImage',
  femerge: 'feMerge',
  femergenode: 'feMergeNode',
  femorphology: 'feMorphology',
  feoffset: 'feOffset',
  fepointlight: 'fePointLight',
  fespecularlighting: 'feSpecularLighting',
  fespotlight: 'feSpotLight',
  fetile: 'feTile',
  feturbulence: 'feTurbulence',
  foreignobject: 'foreignObject',
  lineargradient: 'linearGradient',
  radialgradient: 'radialGradient',
  textpath: 'textPath',
};
const getConfig = () => {
  return {
    tasks: () => [],
    template: (obj) => `
import React from 'react';
import { createBaseComponent } from '@semcore/core';
import Icon from '../..${obj.type ? '/../' : '/'}lib/${
      obj.buildType === 'esm' ? 'esm/index.mjs' : 'cjs/index.js'
    }';

function Root${obj.name}({width = '${obj.width}', height = '${obj.height}', viewBox = '${
      obj.viewBox
    }', ...props}, ref) {
  return (
      <Icon 
        ref={ref}
        data-name="${obj.dataName}" 
        data-group="${obj.dataGroup}"
        width={width}
        height={height}
        viewBox={viewBox}
        {...props}
      >
          ${obj.sourcePath}
      </Icon>
    );
}

Root${obj.name}.displayName = '${obj.name}'

const ${obj.name} = createBaseComponent(Root${obj.name})

export {
  ${obj.name} as default
}
      `,
    templateDTS: () => `
import { IconProps } from '@semcore/icon';
import { Intergalactic } from '@semcore/core';
declare const _default: Intergalactic.Component<'svg', IconProps>;
export default _default;
      `,
    transformer: () => {
      const HtmlToReactParser = require('html-to-react').Parser;
      const parser = new HtmlToReactParser();
      const stringifyJsx = (reactElement) => {
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
        const tagName = svgElementTagNames[type] ?? type;
        const { children, ...otherProps } = props;
        let attributes = Object.entries(otherProps)
          .map(([key, value]) => (value === true ? key : `${key}="${value}"`))
          .join(' ');
        if (attributes) {
          attributes = ` ${attributes}`;
        }
        return `<${tagName}${attributes}>${stringifyJsx(children)}</${tagName}>`;
      };
      return {
        convert: (htmlText) => {
          const jsxModel = parser.parse(htmlText);
          return stringifyJsx(jsxModel);
        },
      };
    },
    babelConfig: {
      presets: ['@babel/preset-react', ['@babel/preset-env', { modules: 'cjs' }]],
      plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
    },
  };
};

module.exports = getConfig;
