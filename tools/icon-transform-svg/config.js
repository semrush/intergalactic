'use strict';

// Reference: https://developer.mozilla.org/en-US/docs/Web/SVG/Element#SVG_elements
const GET_ELEMENT_TAG_NAME = (name) => {
  const ELEMENT_TAG_NAME_MAPPING = {
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
  return ELEMENT_TAG_NAME_MAPPING[name] || name;
};
const getConfig = (framework = 'react', logger = false) => {
  const config = {
    react: {
      template: (obj) => `
      import React from 'react';
      import { createBaseComponent } from '@semcore/core';
      import Icon from '@semcore/icon';
      ${logger ? "import logger from '@semcore/utils/lib/logger';" : ''}
      
      function ${obj.NAME}({width = '${obj.WIDTH}', height = '${obj.HEIGHT}', viewBox = '${
        obj.VIEW_BOX
      }', ...props}, ref) {
        ${
          logger
            ? `logger.warn(true, "you are using the old icon, use import from '@semcore/icon/Name/Size'", "${obj.NAME}")`
            : ''
        }
        return (
            <Icon 
              ref={ref}
              data-name="${obj.DATA_NAME}" 
              data-group="${obj.DATA_GROUP}"
              width={width}
              height={height}
              viewBox={viewBox}
              {...props}
            >
               ${obj.SOURCE_PATH}
            </Icon>
          );
      }
      
      ${obj.NAME}.displayName = '${obj.NAME}'
      
      export default createBaseComponent(${obj.NAME})
      `,
      templateDTS: (NAME) => `
        import React from 'react';
        import { Merge } from '@semcore/core';
        import { IIconProps } from '@semcore/icon';
        declare const _default: import("@semcore/core").ComponentType<Merge<IIconProps, React.SVGAttributes<SVGElement>>, {}, {}>;
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
          const tagName = GET_ELEMENT_TAG_NAME(type);
          const { children, ...otherProps } = props;
          let attributes = Object.entries(otherProps)
            .map(([key, value]) => (value === true ? key : `${key}="${value}"`))
            .join(' ');
          if (attributes) {
            attributes = ' ' + attributes;
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
    },
  };

  if (!config[framework])
    throw new Error(`TransformSvgToFramework err. ${framework} config is not defined`);

  return config[framework];
};

module.exports = getConfig;
