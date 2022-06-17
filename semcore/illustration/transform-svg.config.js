const path = require('path');

function getDescriptionImages(imgPath, outLib) {
  const name = path.basename(imgPath, '.svg');
  return {
    location: `${outLib}/${name}/index.js`,
    group: '',
    name,
  };
}

const getConfig = () => {
  return {
    tasks: ({ generateIcons }) => {
      return [generateIcons('svg', '.', getDescriptionImages)];
    },

    template: (obj) => `
import React from 'react';
import { createBaseComponent } from '@semcore/core';
import { Box } from '@semcore/flex-box';

function ${obj.name}({fill = '${obj.fill}', width = '${obj.width}', height = '${obj.height}', viewBox = '${obj.viewBox}', ...props}, ref) {

  return (
      <Box 
        ref={ref}
        width={width}
        height={height}
        viewBox={viewBox}
        fill={fill}
        tag="svg"
        {...props}
      >
          ${obj.sourcePath}
      </Box>
    );
}

${obj.name}.displayName = '${obj.name}'

export default createBaseComponent(${obj.name})
      `,

    templateDTS: () => `
import { Box } from '@semcore/flex-box';
declare const _default: typeof Box;
export default _default;
      `,
  };
};

module.exports = getConfig;
