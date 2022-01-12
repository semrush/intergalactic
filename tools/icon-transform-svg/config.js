'use strict';

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
            ? `logger.warn(true, "use import icon from '@semcore/icon/${obj.NAME}${obj.DATA_GROUP &&
                '/' + obj.DATA_GROUP}'", "${obj.NAME}")`
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
        const HtmlToJsx = require('htmltojsx');
        return new HtmlToJsx({ createClass: false });
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
